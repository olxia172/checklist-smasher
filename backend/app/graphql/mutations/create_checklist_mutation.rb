module Mutations
  class CreateChecklistMutation < Mutations::BaseMutation
    argument :name, String, required: true

    field :checklist, Types::ChecklistType, null: true
    field :errors, [String], null: false

    def resolve(name:)
      enjoyer = context[:current_user]
      checklist = enjoyer&.checklists&.new(name: name, enjoyer: Enjoyer.first)

      if checklist.save
        { checklist: checklist, errors: [] }
      else
        { errors: checklist.errors.full_messages }
      end
    end
  end
end