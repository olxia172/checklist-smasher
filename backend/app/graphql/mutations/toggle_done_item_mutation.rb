module Mutations
  class ToggleDoneItemMutation < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :done, Boolean, required: true
    argument :date, String, required: false

    field :item, Types::ItemType, null: true

    def resolve(id:, done:, date: Date.today.to_s)
      item = Item.find(id)

      if done
        item.events.create!(action: Event::ITEM_MARKED_DONE, occured_on: date)
      else
        if item.schedule.present?
          item.events.item_marked_done.where(occured_on: Date.parse(date)).each(&:destroy!)
        else
          item.events.item_marked_done.each(&:destroy!)
        end
      end

      {
        item: item
      }
    end
  end
end
