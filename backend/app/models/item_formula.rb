class ItemFormula < ApplicationRecord
  belongs_to :checklist
  belongs_to :schedule

  has_many :items

  validates :name, presence: true
end
