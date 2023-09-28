Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :movies
  root "suggestions#index"
  #resource :search, only: [:show]
  get '/search', to: 'searchs#index', as: 'search'
  get '/search/:id', to: 'searchs#show'


  namespace :api do
    namespace :v1 do
      get 'suggestions/index'
      post 'suggestions/', to:  'suggestions#create'
      delete 'suggestions/:id', to: 'suggestions#destroy'

      post 'blocks/', to: 'blocks#create'
      get 'blocks/index' 
    end
  end
end
