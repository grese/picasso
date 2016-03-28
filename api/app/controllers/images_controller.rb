class ImagesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_image, only: [:show, :edit, :update, :destroy]

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

  # respond_to do |format|
  #   format.json { render json: @image, meta: { created_at: @image[:created_at], updated_at: @image[:updated_at] } }
  # end
  def create
    @image = Image.new(image_params)
    filename = @image.save_data(params[:data])

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


  # # PATCH/PUT /images/:id
  # def update
  #   respond_to do |format|
  #     if @image.update(image_params)
  #       format.html { redirect_to @image, notice: 'Image was successfully updated.' }
  #       format.json { render :show, status: :ok, location: @image }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @image.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end
  #
  # # DELETE /images/:id
  # def destroy
  #   @image.destroy
  #   respond_to do |format|
  #     format.html { redirect_to images_url, notice: 'Image was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_image
      @image = Image.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def image_params
      params.require(:image).permit(:user, :title, :filename)
    end
end
