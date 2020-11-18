module Types
  class EnjoyerType < Types::BaseObject
    description 'An enjoyer'

    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
    field :checklists_count, Int, null: false
  end
end
