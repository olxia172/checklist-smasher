class Checklist < ApplicationRecord
  belongs_to :enjoyer
  has_many :items
  has_one :category
end
