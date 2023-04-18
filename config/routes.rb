Rails.application.routes.draw do
  resources :protocols, except: [:show, :index]
  resources :areas, except: [:show, :update] do
    resources :protocols, only: [:create, :show, :index]
  end
  resources :saved_protocols, only: [:index, :create, :destroy]
  
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/auth/:provider/callback", to: "sessions#omniauth"
  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
