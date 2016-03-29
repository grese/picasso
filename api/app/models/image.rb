class Image < ActiveRecord::Base
  belongs_to :user

  @@upload_dir = 'public/uploads'

  def create_image(data_uri)
    self.filename = "#{SecureRandom.uuid}.png"
    write_image_data_to_file(data_uri)
    self.filename
  end

  def update_image(data_uri)
    write_image_data_to_file(data_uri)
  end

  private
    def write_image_data_to_file(data_uri)
      png = Base64.decode64(data_uri['data:image/png;base64,'.length .. -1])
      File.open("#{@@upload_dir}/#{self.filename}", 'wb') do |f|
        f.write(png)
      end
    end

end
