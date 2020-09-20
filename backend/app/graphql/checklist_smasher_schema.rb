class ChecklistSmasherSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  # Opt in to the new runtime (default in future graphql-ruby versions)
  use GraphQL::Execution::Interpreter

  # Add built-in connections for pagination
  use GraphQL::Pagination::Connections

  use GraphQL::Analysis::AST

  use GraphQL::Execution::Errors

  use GraphQL::Guard.new(
    policy_object: GraphqlPolicy,
    not_authorized: ->(type, field) do
      GraphQL::ExecutionError.new("Not authorized to access #{type}.#{field}")
    end
  )

  # err is the error that was raised during field execution, then rescued
  # obj is the object which was having a field resolved against it
  # args is the the Hash of arguments passed to the resolver
  # ctx is the query context
  # field is the GraphQL::Schema::Field instance for the field where the error was rescued

  rescue_from(ActiveRecord::RecordNotFound) do |err, _obj, _args, _ctx, _field|
    message = I18n.t('errors.not_found', record_type: err.model)
    GraphQL::ExecutionError.new(message)
  end
end
