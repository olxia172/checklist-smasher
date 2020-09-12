class Event < ApplicationRecord
  belongs_to :eventable, polymorphic: true

  enum action: {
    checklist_created: 1,
    item_added: 2,
    item_scheduled: 3,
    item_marked_done: 4,
    item_cancelled: 5
  }
end
