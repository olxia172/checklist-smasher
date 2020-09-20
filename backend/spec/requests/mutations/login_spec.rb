# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'login', type: :graphql do
  let!(:enjoyer) { create(:enjoyer, name: 'Ola', email: 'ola@test.pl', password: "1234", password_confirmation: "1234") }
  let(:schema)  { use_schema(ChecklistSmasherSchema, context: {}) }
  let(:mutation) { graphql_fixture("login.graphql") }

  subject { schema.execute(mutation.login, variables) }

  describe "when valid credentials" do
    context "when login via name" do
      let(:variables) { { identifier: "Ola", password: "1234" } }

      it 'should be successful' do
        expect(subject).to be_successful_query
      end

      it "should return proper response" do
        expect(subject.dig("data", "login", "key").present?).to eq(true)
      end
    end

    context "when login via email" do
      let(:variables) { { identifier: "ola@test.pl", password: "1234" } }

      it 'should be successful' do
        expect(subject).to be_successful_query
      end

      it "should return proper response" do
        expect(subject.dig("data", "login", "key").present?).to eq(true)
      end
    end
  end

  describe "when invalid credentials" do
    context "when invalid password" do
      let(:variables) { { identifier: "Ola", password: "123456789" } }

      it 'should NOT be successful' do
        expect(subject).not_to be_successful_query
      end

      it "should return proper response" do
        expect(subject.dig("data", "login", "key").present?).to eq(false)

        errors = subject.dig("errors")
        expect(errors.present?).to eq(true)
        expect(errors.first.dig("message")).to eq("Invalid identifier of password")
      end
    end

    context "when user not present" do
      let(:variables) { { identifier: "Ola44444", password: "1234" } }

      it 'should NOT be successful' do
        expect(subject).not_to be_successful_query
      end

      it "should return proper response" do
        expect(subject.dig("data", "login", "key").present?).to eq(false)

        errors = subject.dig("errors")
        expect(errors.present?).to eq(true)
        expect(errors.first.dig("message")).to eq("User not found")
      end
    end
  end
end
