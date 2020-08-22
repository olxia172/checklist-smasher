module Types
  class SchedulePayloadAttributes < Types::BaseObject
    field :start_date, String, null: false
    field :repeat, String, null: true
    field :every, Int, null: false
    field :days, [String], null: false
    field :end_date, String, null: false
    field :occurences_count, Int, null: false
    field :days_of_month, [Int], null: false
  end
end
