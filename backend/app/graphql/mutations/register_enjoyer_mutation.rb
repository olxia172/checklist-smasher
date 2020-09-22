module Mutations
  class RegisterEnjoyerMutation < Mutations::BaseMutation
    null false

    argument :name, String, required: true
    argument :email, String, required: true
    argument :password, String, required: true

    field :key, String, null: true

    def resolve(name:, email:, password:)
      enjoyer = Enjoyer.new(name: name, email: email, password: password)

      if enjoyer.save!
        {
          key: enjoyer.sessions.create
        }
      end
    end
  end
end
