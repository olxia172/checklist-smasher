module Types
  class MutationType < Types::BaseObject
    field :add_item, mutation: Mutations::AddItemMutation
    field :toggle_done_item, mutation: Mutations::ToggleDoneItemMutation
  end
end
