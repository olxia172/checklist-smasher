# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Types::SchedulePayloadType, type: :graphql do
  subject { described_class }

  it { is_expected.to have_field(:start_date).of_type("String!") }
  it { is_expected.to have_field(:repeat).of_type("String!") }
  it { is_expected.to have_field(:every).of_type("Int") }
  it { is_expected.to have_field(:days).of_type("[String!]") }
  it { is_expected.to have_field(:end_date).of_type("String") }
  it { is_expected.to have_field(:occurences_count).of_type("Int") }
  it { is_expected.to have_field(:days_of_month).of_type("[Int!]") }
end
