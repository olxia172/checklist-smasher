module Mutations
  class ToggleDoneItemMutation < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :done, Boolean, required: true
    argument :date, String, required: false

    field :item, Types::ItemType, null: true

    def resolve(id:, done:, date: Date.today.to_s)
      item = Item.find(id)
      if done
        item.events.create!(action: Event::ITEM_MARKED_DONE)
      else
        item.events.where("created_at::date = ?", Date.parse(date)).where(action: Event::ITEM_MARKED_DONE).each(&:destroy!)
      end

      {
        item: item
      }
    end
  end
end
