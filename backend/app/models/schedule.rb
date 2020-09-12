class Schedule < ApplicationRecord
  belongs_to :enjoyer
  has_many :items

  store_accessor :rules_data, :payload, :schedule_data

  def schema
    IceCube::Schedule.from_hash(schedule_data)
  end
end
