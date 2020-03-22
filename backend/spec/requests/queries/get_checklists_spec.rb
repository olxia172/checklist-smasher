# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'checklists', type: :graphql do
  let(:schema)  { use_schema(ChecklistSmasherSchema, context: {}) }
  let(:queries) { graphql_fixture("getChecklists.graphql") }

  subject { schema.execute(queries.checklists) }

  let!(:checklist1) { create(:checklist) }
  let!(:checklist2) { create(:checklist) }

  it 'should return proper response' do
    expect(subject.dig("data", "checklists")).to(match_array(
      Checklist.all.map { |item| { "name" => item.name } }
    ))
  end
end
