# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'RemoveItemMutation', type: :graphql do
  let!(:item) { create(:item) }
  let(:test_query) { graphql_fixture("removeItem.graphql").remove_item }

  subject { schema.execute(test_query, variables) }

  describe 'when success' do
    let(:variables) { { id: item.id } }

    it 'should be successful' do
      expect(subject).to be_successful_query
    end

    it 'should remove item' do
      expect { subject }.to change { Item.count }.by(-1)
    end

    it 'should return proper response' do
      expect(subject.dig('data', 'removeItem', 'errors')).to eq(nil)
    end
  end

  describe 'when item not found' do
    let(:variables) { { id: 12345 } }

    it 'should be successful' do
      expect(subject).not_to be_successful_query
    end

    it 'should return proper response' do
      expect(subject.dig('errors').map { |err| err['message'] }).to eq(['Sorry! Item not found'])
    end
  end
end
