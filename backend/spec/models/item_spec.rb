require 'rails_helper'

RSpec.describe Item, type: :model do
  it "has a valid factory" do
    expect(build(:item)).to be_valid
  end

  let(:item) { create(:item) }

  describe "ActiveModel validations" do
    it { expect(item).to validate_presence_of(:name) }
  end

  describe "ActiveRecord associations" do
    it { expect(item).to belong_to(:checklist) }
    it { expect(item).to belong_to(:schedule).optional }
    it { expect(item).to have_many(:events) }
  end

  describe "callbacks" do
    it { expect(item).to callback(:register_creation).after(:create) }
  end
end
