module Types
  class ItemType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :done, Boolean, null: true
    field :cancelled, Boolean, null: true
    field :checklist, Types::ChecklistType, null: false
  end
end
