# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'dailyChecklists', type: :graphql do
  let(:schema)  { use_schema(ChecklistSmasherSchema, context: { current_user: enjoyer }) }
  let(:queries) { graphql_fixture("getDailyChecklists.graphql") }

  subject { schema.execute(queries.daily_checklists, variables) }

  before(:all) do
    travel_to Time.zone.local(2020, 10, 17, 12, 00, 00)

    enjoyer = create(:enjoyer)
    checklist1 = Checklist.create!(name: 'Cleaning', enjoyer_id: enjoyer.id)
    checklist2 = Checklist.create!(name: 'Bills', enjoyer_id: enjoyer.id)
    checklist3 = Checklist.create!(name: 'Shopping', enjoyer_id: enjoyer.id)

    item1 = Item.create!(name: 'Kitchen table', checklist_id: checklist1.id)
    item2 = Item.create!(name: 'Shower', checklist_id: checklist1.id)
    item3 = Item.create!(name: 'Bath sink', checklist_id: checklist1.id)
    item4 = Item.create!(name: 'Dishwashing', checklist_id: checklist1.id)
    item5 = Item.create!(name: 'Electricity', checklist_id: checklist2.id)
    item6 = Item.create!(name: 'Apartment', checklist_id: checklist2.id)
    item7 = Item.create!(name: 'Apartment renovation', checklist_id: checklist2.id)
    item8 = Item.create!(name: 'Gas', checklist_id: checklist2.id)

    Item.create!(name: 'Bread', checklist_id: checklist3.id)
    Item.create!(name: 'Butter', checklist_id: checklist3.id)
    Item.create!(name: 'Orange juice', checklist_id: checklist3.id)
    Item.create!(name: 'Cookies', checklist_id: checklist3.id)

    params_item1 = { repeat: 'daily' }
    ItemScheduler.new(base_item: item1, enjoyer: enjoyer, **params_item1).call

    params_item2 = { repeat: 'weekly', days: ['saturday'] }
    ItemScheduler.new(base_item: item2, enjoyer: enjoyer, **params_item2).call

    params_item3 = { repeat: 'daily', every: 3 }
    ItemScheduler.new(base_item: item3, enjoyer: enjoyer, **params_item3).call

    params_item4 = { repeat: 'daily', every: 2 }
    ItemScheduler.new(base_item: item4, enjoyer: enjoyer, **params_item4).call

    params_item5 = { repeat: 'monthly', days_of_month: [3] }
    ItemScheduler.new(base_item: item5, enjoyer: enjoyer, **params_item5).call

    params_item6 = { repeat: 'monthly', days_of_month: [12, 13, 14] }
    ItemScheduler.new(base_item: item6, enjoyer: enjoyer, **params_item6).call

    params_item7 = { repeat: 'monthly', days_of_month: [12, 13, 14] }
    ItemScheduler.new(base_item: item7, enjoyer: enjoyer, **params_item7).call

    params_item8 = { repeat: 'monthly', days_of_month: [10] }
    ItemScheduler.new(base_item: item8, enjoyer: enjoyer, **params_item8).call
  end

  after(:all) do
    travel_back
  end

  describe "when enjoyer logged in" do
    let(:enjoyer) { Enjoyer.last }

    describe "checklists and items fetching by date" do
      context "when date today" do
        let(:variables) { { date: Date.today.to_s } }

        it 'should be successful' do
          expect(subject).to be_successful_query
        end

        it 'should return checklists only with items to do (if scheduled) or with items with no schedule' do
          checklists = subject.dig("data", "dailyChecklists")
          checklists_names = checklists.map { |ch| ch.dig("name") }
          items_to_do = checklists.map { |ch| ch.dig("items") }.flatten.map { |item| item.dig("name") }.flatten
          expect(checklists.size).to eq(3)
          expect(checklists_names).to match_array(["Cleaning", "Shopping", "Bills"])
          expect(items_to_do).to match_array(["Kitchen table", "Bread", "Butter", "Orange juice", "Cookies"])
        end
      end

      context "when date in the future (eg. when bills reminders are scheduled)" do
        let(:variables) { { date: "2020-11-12" } }

        it 'should be successful' do
          expect(subject).to be_successful_query
        end

        it 'should return checklists only with items to do (if scheduled) or with items with no schedule' do
          checklists = subject.dig("data", "dailyChecklists")
          checklists_names = checklists.map { |ch| ch.dig("name") }
          items_to_do = checklists.map { |ch| ch.dig("items") }.flatten.map { |item| item.dig("name") }.flatten
          expect(checklists.size).to eq(3)
          expect(checklists_names).to match_array(["Cleaning", "Shopping", "Bills"])
          expect(items_to_do).to match_array(["Kitchen table", "Dishwashing", "Bread", "Butter", "Orange juice", "Cookies", "Apartment", "Apartment renovation", "Electricity"])
        end
      end

      context "when date is not present" do
        let(:variables) { { date: nil } }

        it 'should NOT be successful' do
          expect(subject).not_to be_successful_query
        end
      end
    end

    describe "done attribute on elements by date" do
      before do
        item = Item.find_by_name("Kitchen table")
        item.events.create!(action: Event::ITEM_MARKED_DONE, occured_on: Date.today.to_s)
      end

      describe "when quering items with the same date when item was marked as done" do
        let(:variables) { { date: Date.today.to_s } }

        it 'should be successful' do
          expect(subject).to be_successful_query
        end

        it 'should return done = true for item' do
          checklists = subject.dig("data", "dailyChecklists")
          items_to_do = checklists.map { |ch| ch.dig("items") }.flatten
          done_item = items_to_do.select { |item| item.dig("name") == "Kitchen table" }.first
          expect(done_item&.dig("done")).to be_truthy
        end
      end

      describe "when quering items with NOT the same date when item was marked as done" do
        let(:variables) { { date: Date.tomorrow.to_s } }

        it 'should be successful' do
          expect(subject).to be_successful_query
        end

        it 'should return done = false for item' do
          checklists = subject.dig("data", "dailyChecklists")
          items_to_do = checklists.map { |ch| ch.dig("items") }.flatten
          done_item = items_to_do.select { |item| item.dig("name") == "Kitchen table" }.first
          expect(done_item&.dig("done")).to be_falsy
        end
      end
    end
  end

  describe "when user is not logged in" do
    let(:enjoyer) { nil }
    let(:variables) { { date: Date.tomorrow.to_s } }

    it 'should NOT be successful' do
      expect(subject).not_to be_successful_query
    end

    it 'should return proper response' do
      expect(subject.dig("data")).to eq(nil)

      errors = subject.dig("errors")
      expect(errors.size).to eq(1)
      expect(errors.first.dig("message")).to eq("Not authorized to access Query.dailyChecklists")
    end
  end
end
