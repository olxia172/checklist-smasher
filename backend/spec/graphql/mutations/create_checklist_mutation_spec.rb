# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'CreateChecklistMutation', type: :graphql do
  let(:schema)  { use_schema(ChecklistSmasherSchema, context: { current_user: enjoyer }) }
  let(:queries) { graphql_fixture("createChecklist.graphql") }

  subject { schema.execute(queries.create_checklist, variables) }

  describe "when user logged in" do
    let!(:enjoyer) { create(:enjoyer) }

    describe "when valid data" do
      let(:variables) { { input: { name: 'Test checklist' } } }

      it 'should be successful' do
        expect(subject).to be_successful_query
      end

      it 'should create checklist' do
        expect { subject }.to change { enjoyer.reload.checklists.count }.by(1)
                          .and change { Event.count }.by(1)
      end

      it 'should return proper response' do
        expect(subject.dig('data', 'createChecklist', 'checklist', 'id')).to eq(Checklist.last.id.to_s)
        expect(subject.dig('data', 'createChecklist', 'checklist', 'name')).to eq('Test checklist')
      end
    end

    describe "when invalid data" do
      context "when name is blank" do
        let(:variables) { { input: { name: '' } } }

        it 'should NOT be successful' do
          expect(subject).not_to be_successful_query
        end

        it 'should return proper response' do
          expect(subject.dig("data", "createChecklist")).to eq(nil)

          errors = subject.dig("errors")
          expect(errors.size).to eq(1)
          expect(errors.first.dig("message")).to eq("Sorry! Checklist cannot be saved, because of invalid data: Name can't be blank")
        end
      end
    end
  end

  describe "when user is not logged in" do
    let(:enjoyer)  { nil }
    let(:variables) { { input: { name: 'Test checklist' } } }

    it 'should NOT be successful' do
      expect(subject).not_to be_successful_query
    end

    it 'should return proper response' do
      expect(subject.dig("data", "createChecklist")).to eq(nil)

      errors = subject.dig("errors")
      expect(errors.size).to eq(1)
      expect(errors.first.dig("message")).to eq("Not authorized to access Mutation.createChecklist")
    end
  end
end
