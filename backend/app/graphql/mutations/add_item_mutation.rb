module Mutations
  class AddItemMutation < Mutations::BaseMutation
    argument :name, String, required: true
    argument :checklist_id, ID, required: true

    field :item, Types::ItemType, null: true
    field :errors, [String], null: false

    def resolve(name:, checklist_id:)
      # if context[:current_user].nil?
      #   raise GraphQL::ExecutionError,
      #         "You need to authenticate to perform this action"
      # end
      #
      #
      enjoyer = context[:current_user]
      checklist = enjoyer&.checklists&.find_by(id: checklist_id)
      item = checklist&.items&.new(name: name)

      if item.save
        { item: item, errors: [] }
      else
        { errors: item.errors.full_messages }
      end
    end
  end
end