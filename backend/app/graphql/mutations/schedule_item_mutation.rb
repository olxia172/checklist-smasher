module Mutations
  class ScheduleItemMutation < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :schedule_data, Types::ScheduleDataAttributes, required: true

    field :errors, [String], null: true
    field :item, Types::ItemType, null: true
    field :schedule, Types::ScheduleType, null: true

    def resolve(id:, schedule_data:)
      # if context[:current_user].nil?
      #   raise GraphQL::ExecutionError,
      #         "You need to authenticate to perform this action"
      # end
      #
      item = Item.find(id)
      scheduler = ItemScheduler.new(base_item: item, enjoyer: context[:current_user], **schedule_data)

      if scheduler.call
        { item: item, schedule: scheduler.schedule }
      else
        { errors: scheduler.errors }
      end
    end
  end
end
