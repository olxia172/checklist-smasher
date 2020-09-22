require 'rails_helper'

RSpec.describe Checklist, type: :model do
  it "has a valid factory" do
    expect(build(:checklist)).to be_valid
  end

  let(:checklist) { create(:checklist) }

  describe "ActiveModel validations" do
    it { expect(checklist).to validate_presence_of(:name) }
  end

  describe "ActiveRecord associations" do
    it { expect(checklist).to belong_to(:enjoyer) }
    it { expect(checklist).to belong_to(:category).optional }
    it { expect(checklist).to have_many(:items) }
    it { expect(checklist).to have_many(:events) }
  end

  describe "callbacks" do
    it { expect(checklist).to callback(:register_creation).after(:create) }
  end
end
