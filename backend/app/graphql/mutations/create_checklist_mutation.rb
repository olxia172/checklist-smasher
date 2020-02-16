module Mutations
  class CreateChecklistMutation < Mutations::BaseMutation
    argument :name, String, required: true

    field :checklist, Types::ChecklistType, null: true
    field :errors, [String], null: false

    def resolve(name:)
      # if context[:current_user].nil?
      #   raise GraphQL::ExecutionError,
      #         "You need to authenticate to perform this action"
      # end
      #

      checklist = Checklist.new(name: name, enjoyer: Enjoyer.first)

      if checklist.save
        { checklist: checklist, errors: [] }
      else
        { errors: item.errors.full_messages }
      end
    end
  end
end