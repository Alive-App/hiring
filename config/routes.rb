Rails.application.routes.draw do

  resources :cell_phones do
    collection { post :import }
  end

  root to: "cell_phones#index", as: "cell_phones_index"
  post 'cell_phones/import', to: 'cell_phones#import'

end
