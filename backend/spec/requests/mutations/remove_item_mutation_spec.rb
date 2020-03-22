# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'RemoveItemMutation', type: :graphql do
  let!(:item) { create(:item) }
  let(:schema)  { use_schema(ChecklistSmasherSchema, context: {}) }
  let(:queries) { graphql_fixture("removeItem.graphql") }

  subject { schema.execute(queries.remove_item, variables) }

  let(:variables) { { id: item.id } }

  it 'should be successful' do
    expect(subject).to be_successful_query
  end

  it 'should remove item' do
    expect { subject }.to change { Item.count }.by(-1)
  end

  it 'should return proper response' do
    expect(subject.dig('data', 'removeItem', 'errors')).to eq([])
  end
end
