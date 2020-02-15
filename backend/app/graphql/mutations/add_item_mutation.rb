module Mutations
  class AddItemMutation < Mutations::BaseMutation
    argument :name, String, required: true
    argument :checklist_id, Int, required: true

    field :item, Types::ItemType, null: true
    field :errors, [String], null: false

    def resolve(name:, checklist_id:)
      # if context[:current_user].nil?
      #   raise GraphQL::ExecutionError,
      #         "You need to authenticate to perform this action"
      # end

      item = Item.new(name: name, checklist_id: checklist_id)

      if item.save
        { item: item }
      else
        { errors: item.errors.full_messages }
      end
    end
  end
end