class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :null_session
  protect_from_forgery
  before_action :authenticate, except: [ :index, :show ]
  after_filter :set_csrf_cookie

  def set_csrf_cookie
    cookies['X-CSRF-Token'] = form_authenticity_token if protect_against_forgery?
  end

  protected
  after_filter :set_csrf_cookie

    def validate_csrf
      valid_authenticity_token?(session, request.headers['X-CSRF-TOKEN'])
    end

    def authenticate
      authenticate_or_request_with_http_token do |token|
        token_value = token.sub('Token token=', '').to_s
        session_token = session[:api_key].to_s
        user_id_value = request.headers['HTTP_USER_ID'].to_s
        session_user_id = session[:user_id].to_s

        # verify that request has a valid token for this session...
        valid_token = token_value.present? && session_token.present? && (token_value == session_token)

        # verify that the user_id header matches our currently logged in user...
        valid_user = user_id_value.present? && session_user_id.present? && (user_id_value == session_user_id)

        valid_token && valid_user && validate_csrf
      end
    end

end
