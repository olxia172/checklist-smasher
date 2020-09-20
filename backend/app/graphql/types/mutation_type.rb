module Types
  class MutationType < Types::BaseObject
    field :add_item, mutation: Mutations::AddItemMutation, description: "Allows to add item to checklist"
    field :toggle_done_item, mutation: Mutations::ToggleDoneItemMutation, description: "Allows to toggle item as done/not done"
    field :remove_item, mutation: Mutations::RemoveItemMutation, description: "Allows to permanently remove item"

    field :create_checklist, mutation: Mutations::CreateChecklistMutation

    field :register, mutation: Mutations::RegisterEnjoyerMutation
    field :login, mutation: Mutations::LoginMutation, description: "Allows user to login"

    field :schedule_item, mutation: Mutations::ScheduleItemMutation
  end
end
