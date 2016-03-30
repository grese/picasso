class SessionsController < ApplicationController

  # POST /api/login
  def create
    creds = login()
    if creds[:api_key] && creds[:user_id]
      respond_to do |format|
        format.json { render json: { apiKey: creds[:api_key], userId: creds[:user_id] } }
      end
    else
       respond_to do |format|
         format.json { head :unauthorized }
       end
    end
  end

  # GET/DELETE /api/logout
  def destroy
    session[:user_id] = nil
    respond_to do |format|
      format.json { head :ok }
    end
  end

  private
    def login
      api_key = nil
      user_id = nil

      if params[:email]
        user = User.find_by_email(params[:email])
      else
        user = User.find_by_username(params[:username])
      end

      if user && user.authenticate(params[:password])
        api_key = SecureRandom.hex
        user_id = user.id
        session[:user_id] = api_key
      end

      {:user_id => user_id, :api_key => api_key}
    end
end
