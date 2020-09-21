require 'rails_helper'

RSpec.describe Event, type: :model do
  it "has a valid factory" do
    expect(build(:event)).to be_valid
  end

  let(:event) { create(:event) }

  describe "ActiveRecord associations" do
    it { expect(event).to belong_to(:eventable) }
  end
end
