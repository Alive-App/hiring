Rails.application.routes.draw do
  root 'cellphones#import'

  get 'cellphones/index'
  get 'cellphones/import'
  post 'cellphones/import', to: 'cellphones#import_csv'
end
