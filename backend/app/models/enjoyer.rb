class Enjoyer < ApplicationRecord
  has_secure_password
  validates :name, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true

  has_many :checklists
  has_many :sessions
  has_many :schedules
end
