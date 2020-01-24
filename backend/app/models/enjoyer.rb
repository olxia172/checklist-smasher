class Enjoyer < ApplicationRecord
  extend Devise::Models
  include DeviseTokenAuth::Concerns::User
  has_many :checklists
end
