class UsersController < ApplicationController

  before_action :set_user, only: [:show, :update, :destroy]

  before_action :validate_csrf, only: [ :create ]
  skip_before_action :authenticate, only: [:create]


  # GET /api/users/:id
  def show
    render json: @user
  end

  # POST /api/users
  def create
    @user = User.create(user_create_params)
    if @user.save
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
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
