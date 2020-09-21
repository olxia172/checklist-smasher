# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'RegisterEnjoyerMutation', type: :graphql do
  let(:schema)  { use_schema(ChecklistSmasherSchema, context: {}) }
  let(:mutation) { graphql_fixture("register.graphql") }

  subject { schema.execute(mutation.register, variables) }

  describe "when valid data" do
    context "when login via name" do
      let(:variables) { { input: { name: "Ola", email: "ola@test.pl", password: "1234" } } }

      it 'should be successful' do
        expect(subject).to be_successful_query
      end

      it "should return proper response" do
        expect(subject.dig("data", "register", "key").present?).to eq(true)
      end
    end
  end

  describe "when invalid data" do
    context "when password not present" do
      let(:variables) { { input: { name: "Ola", email: "ola@test.pl", password: "" } } }

      it 'should NOT be successful' do
        expect(subject).not_to be_successful_query
      end

      it "should return proper response" do
        expect(subject.dig("data", "login", "key").present?).to eq(false)

        errors = subject.dig("errors")
        expect(errors.present?).to eq(true)
        expect(errors.first.dig("message")).to eq("Sorry! Enjoyer cannot be saved, because of invalid data: Password can't be blank")
      end
    end

    context "when email not present" do
      let(:variables) { { input: { name: "Ola", email: "", password: "1234" } } }

      it 'should NOT be successful' do
        expect(subject).not_to be_successful_query
      end

      it "should return proper response" do
        expect(subject.dig("data", "login", "key").present?).to eq(false)

        errors = subject.dig("errors")
        expect(errors.present?).to eq(true)
        expect(errors.first.dig("message")).to eq("Sorry! Enjoyer cannot be saved, because of invalid data: Email can't be blank")
      end
    end

    context "when name not present" do
      let(:variables) { { input: { name: "", email: "ola@test.pl", password: "1234" } } }

      it 'should NOT be successful' do
        expect(subject).not_to be_successful_query
      end

      it "should return proper response" do
        expect(subject.dig("data", "login", "key").present?).to eq(false)

        errors = subject.dig("errors")
        expect(errors.present?).to eq(true)
        expect(errors.first.dig("message")).to eq("Sorry! Enjoyer cannot be saved, because of invalid data: Name can't be blank")
      end
    end

    context "when user already present with the same email" do
      let!(:enjoyer) { create(:enjoyer, name: 'Ola', email: 'ola@test.pl', password: "1234", password_confirmation: "1234") }
      let(:variables) { { input: { name: "Ola123", email: "ola@test.pl", password: "1234" } } }

      it 'should NOT be successful' do
        expect(subject).not_to be_successful_query
      end

      it "should return proper response" do
        expect(subject.dig("data", "login", "key").present?).to eq(false)

        errors = subject.dig("errors")
        expect(errors.present?).to eq(true)
        expect(errors.first.dig("message")).to eq("Sorry! Enjoyer cannot be saved, because of invalid data: Email has already been taken")
      end
    end

    context "when user already present with the same name" do
      let!(:enjoyer) { create(:enjoyer, name: 'Ola', email: 'ola@test.pl', password: "1234", password_confirmation: "1234") }
      let(:variables) { { input: { name: "Ola", email: "ola123@test.pl", password: "1234" } } }

      it 'should NOT be successful' do
        expect(subject).not_to be_successful_query
      end

      it "should return proper response" do
        expect(subject.dig("data", "login", "key").present?).to eq(false)

        errors = subject.dig("errors")
        expect(errors.present?).to eq(true)
        expect(errors.first.dig("message")).to eq("Sorry! Enjoyer cannot be saved, because of invalid data: Name has already been taken")
      end
    end
  end
end
