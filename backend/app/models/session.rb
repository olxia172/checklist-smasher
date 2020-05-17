class Session < ApplicationRecord
  belongs_to :enjoyer

  before_create :generate_key

  def generate_key
    self.key = SecureRandom.hex(20)
  end
end
