module Types
  class ItemType < Types::BaseObject
    description "An item of checklist"

    field :id, ID, null: false
    field :name, String, null: false
    field :done, Boolean, null: false
    field :checklist, Types::ChecklistType, null: false
    field :is_scheduled, Boolean, null: false

    def is_scheduled
      object.schedule.present?
    end

    def done
      object.done?
    end
  end
end
