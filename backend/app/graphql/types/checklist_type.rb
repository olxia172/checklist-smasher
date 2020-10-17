module Types
  class ChecklistType < Types::BaseObject
    description "A checklist"

    field :id, ID, null: false
    field :name, String, null: false
    field :enjoyer, Types::EnjoyerType, null: false
    field :items, [Types::ItemType], null: false do
      argument :date, String, required: false
    end

    def items(date:)
      if date.present?
        object.items_to_do(date: date)
      else
        object.items.all
      end
    end
  end
end
