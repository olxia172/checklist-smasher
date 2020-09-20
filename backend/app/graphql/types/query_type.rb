module Types
  class QueryType < Types::BaseObject
    field :checklists,
          [Types::ChecklistType],
          null: false,
          description: "Returns a list of checklists"

    def checklists
      enjoyer = context[:current_user]
      enjoyer&.checklists&.includes(:items)
    end

    field :current_user, Types::EnjoyerType, null: true, description: "Returns current user"

    def current_user
      context[:current_user]
    end

    field :logout, Boolean, null: true, description: "Logout user"

    def logout
      if user = context[:current_user]
        user&.sessions&.each(&:destroy!)
      end

      true
    end
  end
end
