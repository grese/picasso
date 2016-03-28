Rails.application.routes.draw do

  # Mount api resources under /api/

  resources :images, path: '/api/images'

  # Mount Ember app to base route:
  mount_ember_app :frontend, to: "/"

end
