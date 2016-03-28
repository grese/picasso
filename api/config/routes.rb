Rails.application.routes.draw do
  api_path = '/api'
  app_path = '/'

  # Mount api resources under /api/
  resources :images, path: "#{api_path}/images"
  resources :users, path: "#{api_path}/users"

  # Mount Ember app to base route:
  mount_ember_app :frontend, to: app_path

end
