module Mutations
  class AddItemMutation < Mutations::BaseMutation
    argument :name, String, required: true
    argument :checklist_id, ID, required: true

    field :item, Types::ItemType, null: true

    def resolve(name:, checklist_id:)
      checklist = context[:current_user].checklists.find(checklist_id)
      item = checklist.items.new(name: name)

      if item.save!
        { item: item }
      end
    end
  end
end
