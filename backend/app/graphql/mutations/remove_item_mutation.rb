module Mutations
  class RemoveItemMutation < Mutations::BaseMutation
    argument :id, Int, required: true

    field :errors, [String], null: false

    def resolve(id:)
      # if context[:current_user].nil?
      #   raise GraphQL::ExecutionError,
      #         "You need to authenticate to perform this action"
      # end
      #

      item = Item.find(id)

      unless item&.destroy!
        { errors: item&.errors&.full_messages }
      end
    end
  end
end