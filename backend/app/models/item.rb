class Item < ApplicationRecord
  belongs_to :checklist
  belongs_to :item, optional: true
  has_one :rule, as: :ruleable

  validates :name, presence: true

  default_scope { order(done: :asc, updated_at: :desc) }
end
