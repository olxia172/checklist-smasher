class Item < ApplicationRecord
  belongs_to :checklist
  belongs_to :schedule, optional: true
  has_many :events, as: :eventable, dependent: :destroy
  has_many :occurrences

  validates :name, presence: true

  # default_scope { order(done: :asc, updated_at: :desc) }

  after_create :register_creation

  def register_creation
    events.create(action: :item_added)
  end

  def add_occurrences(date)
    schedule.schema.occurrences(date).each { |occ_date| occurrences.create(occurs_at: occ_date) }
  end

  def schedule_data(**args)
    ItemScheduler.new(**args).schedule
  end

  def occurs_on?(date = Date.today)
    if schedule.present?
      hash = schedule.schedule_data
      sch = IceCube::Schedule.from_hash(hash)
      sch.occurs_on?(date)
    else
      true
    end
  end

  def done?(date = Date.today.to_s)
    if schedule.present?
      events.item_marked_done.where(occured_on: date).present?
    else
      events.item_marked_done.any?
    end
  end
end
