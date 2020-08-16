module Types
  class ScheduleType < Types::BaseObject
    field :id, ID, null: false
    field :payload, Types::SchedulePayloadAttributes, null: false
  end
end
