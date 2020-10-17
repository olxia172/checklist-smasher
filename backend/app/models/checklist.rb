class Checklist < ApplicationRecord
  belongs_to :enjoyer, counter_cache: true
  belongs_to :category, optional: true
  has_many :items
  has_many :events, as: :eventable, dependent: :destroy

  validates :name, presence: true

  after_create :register_creation

  scope :to_do_by_date, -> (date) { where(id: Checklist.with_items_to_do(date)) }

  def register_creation
    events.create(action: :checklist_added)
  end

  def items_to_do(date:)
    items.where(id: items_to_do_ids(date))
  end

  def self.with_items_to_do(date)
    query = <<-SQL
      SELECT DISTINCT(checklists.id)
      FROM checklists
      LEFT OUTER JOIN items ON items.checklist_id = checklists.id
      LEFT OUTER JOIN occurrences ON occurrences.item_id = items.id
      LEFT OUTER JOIN schedules ON items.schedule_id = schedules.id
      WHERE occurrences.occurs_at::date = '#{date}' OR schedules.id IS NULL
    SQL

    Checklist.connection.select_all(query).to_a.map { |el| el["id"] }
  end

  def items_to_do_ids(date)
    query = <<-SQL
      SELECT DISTINCT(items.id)
      FROM items
      LEFT OUTER JOIN occurrences ON occurrences.item_id = items.id
      LEFT OUTER JOIN schedules ON items.schedule_id = schedules.id
      WHERE occurrences.occurs_at::date = '#{date}' OR schedules.id IS NULL
    SQL

    items.connection.select_all(query).to_a.map { |el| el["id"] }
  end
end
