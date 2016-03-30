class ImagesController < ApplicationController
  before_action :set_image, only: [:show, :update, :destroy]

  # GET /api/images
  def index
    @images = Image.all
    render json: @images
  end

  # GET /api/images/:id
  def show
    render json: @image
  end

  # POST /api/images
  def create
    @image = Image.new(image_params)
    if @image.save
      render json: @image
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/images/:id
  def destroy
    @image.destroy
    render @image
  end

  # PATCH/PUT /api/images/:id
  def update
    if @image.update(image_params)
      render json: @image
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_image
      @image = Image.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def image_params
      params.require(:data).require(:attributes).permit(:title, :data_uri, :user)
    end
end
