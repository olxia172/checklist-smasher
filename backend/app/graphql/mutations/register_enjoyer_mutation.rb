module Mutations
  class RegisterEnjoyerMutation < Mutations::BaseMutation
    null false

    argument :name, String, required: true
    argument :email, String, required: true
    argument :password, String, required: true

    field :session_key, String, null: true
    field :errors, [String], null: true

    def resolve(name:, email:, password:)
      enjoyer = Enjoyer.new(name: name, email: email, password: password)

      if enjoyer.save
        session = enjoyer.sessions.create

        {
          session_key: session&.key
        }
      else
        {
          errors: enjoyer.errors.full_messages
        }
      end
    end
  end
end