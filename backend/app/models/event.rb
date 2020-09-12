class Event < ApplicationRecord
  belongs_to :eventable, polymorphic: true

  CHECKLIST_ADDED = "checklist_added"
  CHECKLIST_SCHEDULED = "checklist_scheduled"
  CHECKLIST_MARKED_DONE = "checklist_marked_done"
  CHECKLIST_CANCELLED = "checklist_cancelled"
  ITEM_ADDED = "item_added"
  ITEM_SCHEDULED = "item_scheduled"
  ITEM_MARKED_DONE = "item_marked_done"
  ITEM_CANCELLED = "item_cancelled"

  enum action: {
    checklist_added: CHECKLIST_ADDED,
    checklist_scheduled: CHECKLIST_SCHEDULED,
    checklist_marked_done: CHECKLIST_MARKED_DONE,
    checklist_cancelled: CHECKLIST_CANCELLED,
    item_added: ITEM_ADDED,
    item_scheduled: ITEM_SCHEDULED,
    item_marked_done: ITEM_MARKED_DONE,
    item_cancelled: ITEM_CANCELLED,
  }
end
