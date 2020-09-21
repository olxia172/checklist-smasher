class Item < ApplicationRecord
  belongs_to :checklist
  belongs_to :schedule, optional: true
  has_many :events, as: :eventable, dependent: :destroy

  validates :name, presence: true

  # default_scope { order(done: :asc, updated_at: :desc) }

  after_create :register_creation

  def register_creation
    events.create(action: Event::CHECKLIST_ADDED)
  end

  def schedule_data(**args)
    ItemScheduler.new(**args).schedule
  end

  def occurs_on?(date = Date.today)
    hash = schedule.schedule_data
    sch = IceCube::Schedule.from_hash(hash)
    sch.occurs_on?(date)
  end

  def done?(date = Date.today.to_s)
    events.item_marked_done.where("created_at::date = ?", Date.parse(date)).present?
  end
end
