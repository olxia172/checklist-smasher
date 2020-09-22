module Types
  class ScheduleType < Types::BaseObject
    field :id, ID, null: false
    field :payload, Types::SchedulePayloadType, null: false
  end
end
