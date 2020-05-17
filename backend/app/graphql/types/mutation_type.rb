module Types
  class MutationType < Types::BaseObject
    field :add_item, mutation: Mutations::AddItemMutation
    field :toggle_done_item, mutation: Mutations::ToggleDoneItemMutation
    field :remove_item, mutation: Mutations::RemoveItemMutation

    field :create_checklist, mutation: Mutations::CreateChecklistMutation

    field :register, mutation: Mutations::RegisterEnjoyerMutation
  end
end
