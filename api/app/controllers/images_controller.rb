class ImagesController < ApplicationController
  before_action :set_image, only: [:show, :update, :destroy]

  # GET /api/images
  def index
    @images = Image.all

    respond_to do |format|
      format.json { render json: @images, meta: { num_records: @images.length } }
    end

  end

  # GET /api/images/:id
  def show
    respond_to do |format|
      format.json { render json: @image, meta: {created_at: @image[:created_at], updated_at: @image[:updated_at] }}
    end
  end

  # POST /api/images
  def create
    @image = Image.new(image_params)
    filename = @image.create_image(data_uri_param)

    respond_to do |format|
      if filename
        if @image.save
          format.json { render json: @image, meta: {created_at: @image[:created_at]}}
        else
          format.json { render json: @image.errors, status: :unprocessable_entity }
        end
      else
        format.json { render json: @image.errors, status: 'Error while generating image file.' }
      end
    end
  end

  # DELETE /api/images/:id
  def destroy
    @image.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  # PATCH/PUT /api/images/:id
  def update
    respond_to do |format|
      @image.update_image(data_uri_param)

      if @image.update(image_params)
        format.json { render json: @image, meta: {created_at: @image[:created_at], updated_at: @image[:updated_at] }}
      else
        format.json { render json: @image.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_image
      @image = Image.find(params[:id])
    end

    def data_uri_param
      params.require(:data_uri)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def image_params
      params.require(:image).permit(:user_id, :title, :filename)
    end
end
