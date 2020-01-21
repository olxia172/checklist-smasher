class Rule < ApplicationRecord
  belongs_to :ruleable, polymorphic: true
end
