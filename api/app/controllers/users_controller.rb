class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

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

  # POST /api/users
  def create
    @user = User.new(user_create_params)

    respond_to do |format|
      if @user.save
        format.json { render json: @user, meta: {created_at: @user[:created_at]}}
      else
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /api/users/:id
  def update
    respond_to do |format|
      if @user.save(user_update_params)
        format.json { render json: @user, meta: {created_at: @user[:created_at], updated_at: @user[:updated_at]}}
      else
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /api/users/:id
  def destroy
    @user.destroy
    respond_to do |format|
      format.json { render json: @user }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # allowed params for user edit...
    def user_update_params
      params.require(:user).permit(:email, :username)
    end

    # allowed params for user create...
    def user_create_params
      params.require(:user).permit(:email, :username, :password)
    end
end
