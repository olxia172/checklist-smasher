module Types
  class QueryType < Types::BaseObject
    field :checklists,
          [Types::ChecklistType],
          null: false,
          description: "Returns a list of checklists with all items that can be scheduled, serves as templates"

    def checklists
      enjoyer = context[:current_user]
      enjoyer&.checklists&.includes(:items, :events, items: :events)
    end

    field :daily_checklists,
          [Types::ChecklistType],
          null: false,
          description: "Returns checklists with items to do on specific date" do
      argument :date, String, required: true
    end

    def daily_checklists(date:)

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
