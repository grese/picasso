class SessionsController < ApplicationController

  skip_before_action :authenticate

  # POST /api/login
  def create
    login()
    if session[:api_key] && session[:user_id]
      respond_to do |format|
        format.json { render json: { apiKey: session[:api_key], userId: session[:user_id] } }
      end
    else
       respond_to do |format|
         format.json { head :unauthorized }
       end
    end
  end

  # DELETE /api/logout
  def destroy
    reset_session
    respond_to do |format|
      format.json { render json: { status: :ok } }
    end
  end

  private
    def login
      if params[:email]
        user = User.find_by_email(params[:email])
      else
        user = User.find_by_username(params[:username])
      end

      if user && user.authenticate(params[:password])
        session[:user_id] = user.id
        session[:api_key] = SecureRandom.hex
      end
    end
end
