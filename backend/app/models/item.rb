class Item < ApplicationRecord
  belongs_to :checklist
  belongs_to :schedule, optional: true
  has_many :events, as: :eventable

  validates :name, presence: true

  default_scope { order(done: :asc, updated_at: :desc) }

  def schedule_data(**args)
    ItemScheduler.new(**args).schedule
  end

  def occurs_on?(date = Date.today)
    hash = schedule.schedule_data
    sch = IceCube::Schedule.from_hash(hash)
    sch.occurs_on?(date)
  end
end
