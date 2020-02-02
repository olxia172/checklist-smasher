module Types
  class ChecklistType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :enjoyer, Types::EnjoyerType, null: false
  end
end
