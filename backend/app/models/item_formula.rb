class ItemFormula < ApplicationRecord
  belongs_to :checklist
  belongs_to :schedule

  has_many :items

  validates :name, presence: true

  def occurs_on?(date = Date.today)
    hash = schedule.schedule_data
    sch = IceCube::Schedule.from_hash(hash)
    sch.occurs_on?(date)
  end
end
