Rails.application.routes.draw do
  get "/" => "products#index"  
  get "/products/import" => "products#import"
  post "/products/import" => "products#run_import"
  resources :products
end
