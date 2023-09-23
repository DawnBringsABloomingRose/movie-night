Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :movies
  root "movies#index"
  #resource :search, only: [:show]
  get '/search', to: 'searchs#show', as: 'search'
end
