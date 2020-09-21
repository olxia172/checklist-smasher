# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'ScheduleItemMutation', type: :graphql do
  let(:schema)  { use_schema(ChecklistSmasherSchema, context: { current_user: enjoyer }) }
  let(:queries) { graphql_fixture("scheduleItem.graphql") }

  subject { schema.execute(queries.schedule_item, variables) }

  describe "when user logged in" do
    let!(:enjoyer) { create(:enjoyer) }
    let!(:checklist) { create(:checklist, enjoyer: enjoyer) }
    let!(:item) { create(:item, checklist: checklist) }
    let(:variables) { { input: { id: item.id, schedule_data: { repeat: 'daily', every: 3 } } } }

    it 'should be successful' do
      expect(subject).to be_successful_query
    end

    it 'should create checklist' do
      expect { subject }.to change { Schedule.count }.by(1)
    end

    it 'should return proper response' do
      expect(subject.dig('data', 'scheduleItem', 'item', 'id')).to eq(item.id.to_s)
      expect(subject.dig('data', 'scheduleItem', 'schedule', 'id')).to eq(enjoyer.schedules.last.id.to_s)
    end
  end

  describe "when user is not logged in" do
    let(:enjoyer)  { nil }
    let!(:item) { create(:item) }
    let(:variables) { { input: { id: item.id, schedule_data: { repeat: 'daily', every: 3 } } } }

    it 'should NOT be successful' do
      expect(subject).not_to be_successful_query
    end

    it 'should return proper response' do
      expect(subject.dig("data", "scheduleItem")).to eq(nil)

      errors = subject.dig("errors")
      expect(errors.size).to eq(1)
      expect(errors.first.dig("message")).to eq("Not authorized to access Mutation.scheduleItem")
    end
  end
end
