Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  mount_devise_token_auth_for 'Enjoyer', at: 'auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
