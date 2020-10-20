Rails.application.routes.draw do
  get "phones/upload", to: "phones#upload"
  post "phones/update", to: "phones#update"
  get  "phones",  to: "phones#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
