require 'rails_helper'

RSpec.describe Schedule, type: :model do
  it "has a valid factory" do
    expect(build(:schedule)).to be_valid
  end

  let(:schedule) { create(:schedule) }

  describe "ActiveRecord associations" do
    it { expect(schedule).to belong_to(:enjoyer) }
    it { expect(schedule).to have_many(:items) }
  end
end
