# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Types::ItemType, type: :graphql do
  subject { described_class }

  it { is_expected.to have_field(:id).of_type("ID!") }
  it { is_expected.to have_field(:name).of_type("String!") }
  it { is_expected.to have_field(:done).of_type("Boolean!") }
  it { is_expected.to have_field(:is_scheduled).of_type("Boolean!") }
  it { is_expected.to have_field(:checklist).of_type("Checklist!") }
end
