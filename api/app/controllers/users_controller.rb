class UsersController < ApplicationController
  before_action :set_user, only: [:show]

  def new
  end

  # GET /api/users
  def index
    @users = User.all

    respond_to do |format|
      format.json { render json: @users, meta: { num_records: @users.length } }
    end

  end

  # GET /api/users/:id
  def show
    respond_to do |format|
      format.json { render json: @user, meta: {created_at: @user[:created_at], updated_at: @user[:updated_at] }}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:email).permit(:username)
    end
end
