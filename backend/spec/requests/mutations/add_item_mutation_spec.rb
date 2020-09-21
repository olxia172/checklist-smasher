# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'AddItemMutation', type: :graphql do
  let(:schema)  { use_schema(ChecklistSmasherSchema, context: { current_user: enjoyer }) }
  let(:queries) { graphql_fixture("addItem.graphql") }

  subject { schema.execute(queries.add_item, variables) }

  describe "when user logged in" do
    let!(:enjoyer) { create(:enjoyer) }
    let!(:checklist1) { create(:checklist, enjoyer: enjoyer) }

    describe 'when valid data' do
      let(:variables) { { input: { checklist_id: checklist1.id, name: 'Test item' } } }

      it 'should be successful' do
        expect(subject).to be_successful_query
      end

      it 'should create item' do
        expect { subject }.to change { Item.count }.by(1)
                          .and change { Event.count }.by(1)
      end

      it 'should return proper response' do
        expect(subject.dig('data', 'addItem', 'item', 'id')).to eq(Item.last.id.to_s)
      end
    end

    describe "when invalid data" do
      context "when invalid checklist id" do
        let(:variables) { { input: { checklist_id: 344444, name: 'Test item' } } }

        it 'should NOT be successful' do
          expect(subject).not_to be_successful_query
        end

        it 'should return proper response' do
          expect(subject.dig("data", "addItem")).to eq(nil)

          errors = subject.dig("errors")
          expect(errors.size).to eq(1)
          expect(errors.first.dig("message")).to eq("Sorry! Checklist not found")
        end
      end

      context "when name is blank" do
        let(:variables) { { input: { checklist_id: checklist1.id, name: '' } } }

        it 'should NOT be successful' do
          expect(subject).not_to be_successful_query
        end

        it 'should return proper response' do
          expect(subject.dig("data", "addItem")).to eq(nil)

          errors = subject.dig("errors")
          expect(errors.size).to eq(1)
          expect(errors.first.dig("message")).to eq("Sorry! Item cannot be saved, because of invalid data: Name can't be blank")
        end
      end
    end
  end

  describe "when user is not logged in" do
    let(:enjoyer)  { nil }
    let(:variables) { { input: { checklist_id: "1", name: 'Test item' } } }

    it 'should NOT be successful' do
      expect(subject).not_to be_successful_query
    end

    it 'should return proper response' do
      expect(subject.dig("data", "addItem")).to eq(nil)

      errors = subject.dig("errors")
      expect(errors.size).to eq(1)
      expect(errors.first.dig("message")).to eq("Not authorized to access Mutation.addItem")
    end
  end
end
