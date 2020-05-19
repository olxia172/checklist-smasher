module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :checklists,
          [Types::ChecklistType],
          null: false,
          description: "Returns a list of checklists"

    def checklists
      Checklist.all.includes(:items)
    end

    field :current_user, Types::EnjoyerType, null: true

    def current_user
      user = context[:current_user]
      pp user
      user
    end

    field :login, String, null: true, description: "Login a user" do
      argument :email, String, required: true
      argument :password, String, required: true
    end

    def login(email:, password:)
      if user = Enjoyer.where(email: email).first&.authenticate(password)
        user.sessions.create.key
      end
    end

    field :logout, Boolean, null: true, description: "Logout user"

    def logout
      user = context[:current_user]
      user&.sessions&.each(&:destroy!)
      true
    end
  end
end
