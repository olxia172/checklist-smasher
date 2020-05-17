module Types
  class ChecklistType < Types::BaseObject
    description "A checklist"
    
    field :id, ID, null: false
    field :name, String, null: false
    field :enjoyer, Types::EnjoyerType, null: false
    field :items, [Types::ItemType], null: false
  end
end
