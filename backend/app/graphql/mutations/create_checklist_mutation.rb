module Mutations
  class CreateChecklistMutation < Mutations::BaseMutation
    argument :name, String, required: true

    field :checklist, Types::ChecklistType, null: true

    def resolve(name:)
      checklist = context[:current_user].checklists.new(name: name)

      if checklist.save!
        { checklist: checklist }
      end
    end
  end
end
