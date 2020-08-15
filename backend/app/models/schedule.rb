class Schedule < ApplicationRecord
  belongs_to :enjoyer
  has_many :item_formulas

  store_accessor :rules_data, :payload, :schedule_data
end
