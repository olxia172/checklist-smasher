module Mutations
  class LoginMutation < Mutations::BaseMutation
    argument :identifier, String, required: true
    argument :password, String, required: true

    field :key, String, null: true

    def resolve(identifier:, password:)
      user = Enjoyer.find_by(email: identifier) || Enjoyer.find_by(name: identifier)

      if user.nil?
        raise GraphQL::ExecutionError.new("User not found")
      end

      if user.authenticate(password)
        {
          key: user.sessions.create.key
        }
      else
        raise GraphQL::ExecutionError.new("Invalid identifier of password")
      end
    end
  end
end
