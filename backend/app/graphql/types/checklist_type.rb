module Types
  class ChecklistType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :enjoyer, Types::EnjoyerType, null: false
    field :items, [Types::ItemType], null: true, resolve: -> (obj, args, ctx) { obj.items }
  end
end
