require 'sidekiq/web'

Rails.application.routes.draw do
  root to: 'home#index'
  mount Sidekiq::Web => '/sidekiq'
  resources :csv_uploads, only: %i[create new]
  resources :smartphones, only: %i[index]
end
