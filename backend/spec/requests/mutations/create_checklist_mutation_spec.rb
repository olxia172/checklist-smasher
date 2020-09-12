# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'CreateChecklistMutation', type: :graphql do
  let!(:enjoyer) { create(:enjoyer) }
  let(:schema)  { use_schema(ChecklistSmasherSchema, context: { current_user: enjoyer }) }
  let(:queries) { graphql_fixture("createChecklist.graphql") }

  subject { schema.execute(queries.create_checklist, variables) }

  let(:variables) { { name: 'Test checklist' } }

  it 'should be successful' do
    expect(subject).to be_successful_query
  end

  it 'should create checklist' do
    expect { subject }.to change { Checklist.count }.by(1)
  end

  it 'should return proper response' do
    expect(subject.dig('data', 'createChecklist', 'checklist', 'id')).to eq(Checklist.last.id.to_s)
    expect(subject.dig('data', 'createChecklist', 'checklist', 'name')).to eq('Test checklist')
  end
end
