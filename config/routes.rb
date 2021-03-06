Rails.application.routes.draw do
  root to: "static_pages#root"
  get 'auth/facebook/callback', to: 'api/sessions#omniauth_facebook'

  namespace :api, defaults: {format: :json} do
    get "search", to: "utils#search"
    resources :users, only: [:create, :index, :update]
    resources :school_memberships, only: [:create, :destroy]
    resource :session, only: [:create, :destroy, :show]
    resources :reviews, only: [:create, :destroy, :index, :show]
    resources :businesses, only: [:create, :destroy, :index, :show] do
      resources :thumbs, only: [:create, :destroy, :index]
    end
    resources :users, only: [:show]
  end
end
