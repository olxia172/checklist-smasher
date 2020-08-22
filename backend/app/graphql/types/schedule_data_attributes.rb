module Types
  class ScheduleDataAttributes < Types::BaseInputObject
    description "Attributes for creating or updating item schedule"
    argument :start_date, String, required: false
    argument :repeat, String, required: true
    argument :every, Int, required: false
    argument :days, [String], required: false
    argument :end_date, String, required: false
    argument :occurences_count, Int, required: false
    argument :days_of_month, [Int], required: false
  end
end
