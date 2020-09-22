# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'ToggleDoneItemMutation', type: :graphql do
  let(:schema)  { use_schema(ChecklistSmasherSchema, context: { current_user: enjoyer }) }
  let(:queries) { graphql_fixture("toggleDoneItem.graphql") }

  subject { schema.execute(queries.toggle_done_item, variables) }

  describe "when user logged in" do
    let!(:enjoyer) { create(:enjoyer) }

    describe 'when item should be marked as done' do
      let!(:item) { create(:item) }
      let(:variables) { { input: { id: item.id, done: true } } }

      it 'should be successful' do
        expect(subject).to be_successful_query
      end

      it 'should update item' do
        expect { subject }.to change { item.reload.events.count }.by(1)
      end

      it 'should return proper response' do
        expect(subject.dig('data', 'toggleDoneItem', 'item', 'id')).to eq(item.id.to_s)
        expect(subject.dig('data', 'toggleDoneItem', 'item', 'done')).to eq(true)
      end
    end

    describe 'when item should be marked as NOT done' do
      let!(:item1) { create(:item) }
      let!(:event) { create(:event, :item_done, eventable: item1) }
      let(:variables) { { input: { id: item1.id, done: false } } }

      it 'should be successful' do
        expect(subject).to be_successful_query
      end

      it 'should be successful' do
        expect(subject).to be_successful_query
      end

      it 'should update item' do
        expect { subject }.to change { item1.reload.events.count }.by(-1)
      end

      it 'should return proper response' do
        expect(subject.dig('data', 'toggleDoneItem', 'item', 'id')).to eq(item1.id.to_s)
        expect(subject.dig('data', 'toggleDoneItem', 'item', 'done')).to eq(false)
      end
    end

    describe 'when item not found' do
      let(:variables) { { input: { id: 123456, done: false } } }

      it 'should NOT be successful' do
        expect(subject).not_to be_successful_query
      end

      it 'should not create event' do
        expect { subject }.to change { Event.count }.by(0)
      end

      it 'should be successful' do
        expect(subject).not_to be_successful_query
      end

      it 'should return proper response' do
        expect(subject.dig('data', 'toggleDoneItem')).to eq(nil)
        expect(subject.dig('errors').map { |err| err['message'] }).to match_array(['Sorry! Item not found'])
      end
    end
  end

  describe "when user is not logged in" do
    let(:enjoyer)  { nil }
    let!(:item) { create(:item) }
    let(:variables) { { input: { id: item.id, done: true } } }

    it 'should NOT be successful' do
      expect(subject).not_to be_successful_query
    end

    it 'should return proper response' do
      expect(subject.dig("data", "addItem")).to eq(nil)

      errors = subject.dig("errors")
      expect(errors.size).to eq(1)
      expect(errors.first.dig("message")).to eq("Not authorized to access Mutation.toggleDoneItem")
    end
  end
end
