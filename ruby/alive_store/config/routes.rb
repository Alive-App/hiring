Rails.application.routes.draw do
  root :to => "store#index"
  post '/attach/file', to: 'store#file_upload'
  get '/new/upload/file', to: 'store#new', as: 'upload_csv'
end
