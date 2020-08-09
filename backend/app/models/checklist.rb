class Checklist < ApplicationRecord
  belongs_to :enjoyer
  belongs_to :category, optional: true
  has_many :items
  has_many :item_formulas
end
