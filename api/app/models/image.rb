class Image < ActiveRecord::Base
  belongs_to :user
  attr_accessor :data_uri

  before_save :save_image_data

  def save_image_data
    if data_uri.present?
      if !self.filename.present?
        self.filename = "#{SecureRandom.uuid}.png"
      end
      write_image_data_to_file(data_uri)
    end
  end

  private
    def write_image_data_to_file(data_uri)
      upload_dir = 'public/uploads'
      png = Base64.decode64(data_uri['data:image/png;base64,'.length .. -1])
      File.open("#{upload_dir}/#{self.filename}", 'wb') do |f|
        f.write(png)
      end
    end
end
