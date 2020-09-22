class Checklist < ApplicationRecord
  belongs_to :enjoyer
  belongs_to :category, optional: true
  has_many :items
  has_many :events, as: :eventable, dependent: :destroy

  validates :name, presence: true

  after_create :register_creation

  def register_creation
    events.create(action: Event::CHECKLIST_ADDED)
  end
end
