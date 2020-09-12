# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'ToggleDoneItemMutation', type: :graphql do
  let(:schema)  { use_schema(ChecklistSmasherSchema, context: {}) }
  let(:queries) { graphql_fixture("toggleDoneItem.graphql") }

  subject { schema.execute(queries.toggle_done_item, variables) }

  describe 'when item should be marked as done' do
    let!(:item) { create(:item) }
    let(:variables) { { id: item.id, done: true } }

    it 'should be successful' do
      expect(subject).to be_successful_query
    end

    it 'should update item' do
      expect { subject }.to change { item.reload.events.count }.by(1)
    end

    it 'should return proper response' do
      expect(subject.dig('data', 'toggleDoneItem', 'errors')).to eq([])
      expect(subject.dig('data', 'toggleDoneItem', 'item', 'id')).to eq(item.id.to_s)
      expect(subject.dig('data', 'toggleDoneItem', 'item', 'done')).to eq(true)
    end
  end

  describe 'when item should be marked as NOT done' do
    let!(:item1) { create(:item) }
    let!(:event) { create(:event, :item_done, eventable: item1) }
    let(:variables) { { id: item1.id, done: false } }

    it 'should be successful' do
      expect(subject).to be_successful_query
    end

    it 'should update item' do
      expect { subject }.to change { item1.reload.events.count }.by(-1)
    end

    it 'should return proper response' do
      expect(subject.dig('data', 'toggleDoneItem', 'errors')).to eq([])
      expect(subject.dig('data', 'toggleDoneItem', 'item', 'id')).to eq(item1.id.to_s)
      expect(subject.dig('data', 'toggleDoneItem', 'item', 'done')).to eq(false)
    end
  end

  describe 'when item not found' do
    let(:variables) { { id: 123456, done: false } }

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
