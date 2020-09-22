class GraphqlController < ApplicationController
  # If accessing from outside this domain, nullify the session
  # This allows for outside API access while preventing CSRF attacks,
  # but you'll have to authenticate your user separately
  # protect_from_forgery with: :null_session

  def execute
    variables = ensure_hash(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = {
      current_user: set_current_user,
    }
    result = ChecklistSmasherSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    render json: result
  rescue => e
    raise e unless Rails.env.development?
    handle_error_in_development e
  end

  private

  # Handle form data, JSON body, or a blank value
  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      if ambiguous_param.present?
        ensure_hash(JSON.parse(ambiguous_param))
      else
        {}
      end
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end

  def handle_error_in_development(e)
    logger.error e.message
    logger.error e.backtrace.join("\n")

    render json: { error: { message: e.message, backtrace: e.backtrace }, data: {} }, status: 422
  end

  def set_current_user
    Enjoyer.all.first
    # key = request.headers['Authorization']&.split&.last
    #
    # if key.present?
    #   decoded_token = begin
    #     JWT.decode key, ENV['HMAC_SECRET'], true, { algorithm: 'HS256' }
    #   rescue JWT::ExpiredSignature
    #     []
    #   end
    #
    #   enjoyer_id = decoded_token.first&.dig("enjoyer_id")
    #   if enjoyer_id.present?
    #     Enjoyer.find_by(id: enjoyer_id)
    #   end
    # end
  end
end
