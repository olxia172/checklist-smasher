class GraphqlPolicy
  RULES = {
    Types::QueryType => {
      currentUser: ->(obj, args, ctx) { true },
      '*': ->(obj, args, ctx) { is_enjoyer_logged_in?(ctx) }
    },
    Types::MutationType => {
      login: ->(obj, args, ctx) { true },
      register: ->(obj, args, ctx) { true },
      toggleDoneItem: ->(obj, args, ctx) { true },
      '*': ->(obj, args, ctx) { is_enjoyer_logged_in?(ctx) }
    }
  }

  def self.guard(type, field)
    RULES.dig(type, field)
  end

  def self.is_enjoyer_logged_in?(ctx)
    ctx[:current_user].present?
  end
end
