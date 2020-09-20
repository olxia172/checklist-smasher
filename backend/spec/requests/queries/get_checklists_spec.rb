# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'checklists', type: :graphql do
  let!(:enjoyer) { create(:enjoyer) }
  let(:schema)  { use_schema(ChecklistSmasherSchema, context: { current_user: enjoyer }) }
  let(:queries) { graphql_fixture("getChecklists.graphql") }

  subject { schema.execute(queries.checklists) }

  let!(:checklist1) { create(:checklist, enjoyer: enjoyer) }
  let!(:checklist2) { create(:checklist, enjoyer: enjoyer) }

  it 'should return proper response' do
    expect(subject.dig("data", "checklists")).to(match_array(
      Checklist.all.map { |item| { "name" => item.name } }
    ))
  end

  context "when user is not logged in" do
    let(:schema)  { use_schema(ChecklistSmasherSchema, context: {}) }

    subject { schema.execute(queries.checklists) }

    it 'should return proper response' do
      expect(subject.dig("data")).to eq(nil)

      errors = subject.dig("errors")
      expect(errors.size).to eq(1)
      expect(errors.first.dig("message")).to eq("Not authorized to access Query.checklists")
    end
  end
end
