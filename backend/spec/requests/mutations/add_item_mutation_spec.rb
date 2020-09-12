# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'AddItemMutation', type: :graphql do
  let(:enjoyer) { create(:enjoyer) }
  let(:schema)  { use_schema(ChecklistSmasherSchema, context: { current_user: enjoyer }) }
  let(:queries) { graphql_fixture("addItem.graphql") }

  subject { schema.execute(queries.add_item, variables) }

  let!(:checklist1) { create(:checklist, enjoyer: enjoyer) }

  describe 'when success' do
    let(:variables) { { checklist_id: checklist1.id, name: 'Test item' } }

    it 'should create item' do
      expect { subject }.to change { Item.count }.by(1)
    end

    it 'should return proper response' do
      expect(subject.dig('data', 'addItem', 'item', 'id')).to eq(Item.last.id.to_s)
    end
  end

  describe 'when success' do
    let(:variables) { { checklist_id: checklist1.id, name: 'Test item' } }

    it 'should create item' do
      expect { subject }.to change { Item.count }.by(1)
    end

    it 'should return proper response' do
      expect(subject.dig('data', 'addItem', 'item', 'id')).to eq(Item.last.id.to_s)
    end
  end
end
