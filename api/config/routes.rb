Rails.application.routes.draw do
  api_path = '/api'
  app_path = '/'

  # Mount api resources under /api/
  resources :images, path: "#{api_path}/images"
  resources :users, path: "#{api_path}/users"

  # Specify login & logout routes
  get "#{api_path}/login" => 'sessions#new'
  post "#{api_path}/login" => 'sessions#create'
  get "#{api_path}/logout" => 'sessions#destroy'
  delete "#{api_path}/logout" => 'sessions#destroy'

  # Mount Ember app to base route:
  mount_ember_app :frontend, to: app_path
end
