class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # TODO: send auth token from front-end, and then remove the line below.
  skip_before_action :verify_authenticity_token
end
