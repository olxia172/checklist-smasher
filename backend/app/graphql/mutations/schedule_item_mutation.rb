module Mutations
  class ScheduleItemMutation < Mutations::BaseMutation
    argument :id, Int, required: true
    argument :repeat, String, required: true
    argument :every, Int, required: false
    argument :days, [String], required: false
    argument :end, String, required: false

    field :errors, [String], null: false

    def resolve(id:, repeat:, every:, days:, end:)
      # if context[:current_user].nil?
      #   raise GraphQL::ExecutionError,
      #         "You need to authenticate to perform this action"
      # end
      #

      item = Item.find(id)

      unless item&.schedule
        { errors: item&.errors&.full_messages }
      end
    end
  end
end