require 'rails_helper'

RSpec.describe Enjoyer, type: :model do
  it "has a valid factory" do
    expect(build(:enjoyer)).to be_valid
  end

  let(:enjoyer) { create(:enjoyer) }

  describe "ActiveModel validations" do
    it { expect(enjoyer).to validate_presence_of(:name) }
    it { expect(enjoyer).to validate_uniqueness_of(:name) }
    it { expect(enjoyer).to validate_presence_of(:email) }
    it { expect(enjoyer).to validate_uniqueness_of(:email) }
  end

  describe "ActiveRecord associations" do
    it { expect(enjoyer).to have_many(:checklists) }
    it { expect(enjoyer).to have_many(:sessions) }
    it { expect(enjoyer).to have_many(:schedules) }
  end
end
