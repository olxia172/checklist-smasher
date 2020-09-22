module Types
  class SchedulePayloadType < Types::BaseObject
    field :start_date, String, null: false
    field :repeat, String, null: false
    field :every, Int, null: true
    field :days, [String], null: true
    field :end_date, String, null: true
    field :occurences_count, Int, null: true
    field :days_of_month, [Int], null: true
  end
end
