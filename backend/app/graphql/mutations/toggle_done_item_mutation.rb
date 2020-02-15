module Mutations
  class ToggleDoneItemMutation < Mutations::BaseMutation
    argument :id, Int, required: true
    argument :done, Boolean, required: true

    field :item, Types::ItemType, null: true
    field :errors, [String], null: false

    def resolve(id:, done:)
      # if context[:current_user].nil?
      #   raise GraphQL::ExecutionError,
      #         "You need to authenticate to perform this action"
      # end
      #

      item = Item.find_by(id: id)

      item&.update(done: done)

      {
        item: item,
        errors: [],
      }
    end
  end
end