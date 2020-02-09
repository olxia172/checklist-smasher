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
  end
end
