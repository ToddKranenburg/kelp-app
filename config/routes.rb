Rails.application.routes.draw do
  root to: "static_pages#root"
  resources :users, only: [:create, :new]
  resource :session, only: [:create, :new, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :reviews, only: [:create, :destroy, :index, :show]
    resources :businesses, only: [:create, :destroy, :index, :show]
    resources :users, only: [:show]
  end
end
