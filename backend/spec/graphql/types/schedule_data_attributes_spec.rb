# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Types::ScheduleDataAttributes, type: :graphql do
  subject { described_class }

  it { is_expected.to accept_argument(:start_date).of_type("String") }
  it { is_expected.to accept_argument(:repeat).of_type("String!") }
  it { is_expected.to accept_argument(:every).of_type("Int") }
  it { is_expected.to accept_argument(:days).of_type("[String!]") }
  it { is_expected.to accept_argument(:end_date).of_type("String") }
  it { is_expected.to accept_argument(:occurences_count).of_type("Int") }
  it { is_expected.to accept_argument(:days_of_month).of_type("[Int!]") }
end
