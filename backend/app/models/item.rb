class Item < ApplicationRecord
  belongs_to :checklist
  belongs_to :formula, class_name: "Item", optional: true

  enum mode: { simple: 1, formula: 2 }

  validates :name, presence: true

  default_scope { order(done: :asc, updated_at: :desc) }

  def schedule(**args)
    ItemScheduler.new(**args).schedule
  end
end
