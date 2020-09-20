module Mutations
  class RemoveItemMutation < Mutations::BaseMutation
    argument :id, Int, required: true

    field :errors, [String], null: false

    def resolve(id:)
      item = Item.find(id)

      unless item&.destroy!
        { errors: item&.errors&.full_messages }
      end
    end
  end
end
