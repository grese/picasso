class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /api/users/:id
  def show
    render json: @user
  end

  # POST /api/users
  def create
    @user = User.new(user_create_params)
    render json: @user
  end

  # PATCH/PUT /api/users/:id
  def update
    @user.update(user_update_params)
    render json: @user
  end

  # DELETE /api/users/:id
  def destroy
    @user.destroy
    render json: @user
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    def user_update_params
      params.require(:data).require(:attributes).permit(:email, :username, :password, :confirmation)
    end

    def user_create_params
      params.require(:data).require(:attributes).permit(:email, :username, :password, :confirmation)
    end
end
