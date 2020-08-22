class Item < ApplicationRecord
  belongs_to :checklist
  belongs_to :item_formula, optional: true

  validates :name, presence: true

  default_scope { order(done: :asc, updated_at: :desc) }

  def schedule(**args)
    ItemScheduler.new(**args).schedule
  end
end
