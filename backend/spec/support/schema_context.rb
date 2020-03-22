RSpec.shared_context 'GraphQL Schema' do
  let(:schema) { use_schema(ChecklistSmasherSchema, context: {}) }
end

RSpec.configure do |config|
  config.include_context 'GraphQL Schema'
end