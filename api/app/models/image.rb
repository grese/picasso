class Image < ActiveRecord::Base
  belongs_to :user

  @@upload_dir = 'public/uploads'

  def save_data(data_url)
    self.filename = "#{SecureRandom.uuid}.png"
    output = nil
    png = Base64.decode64(data_url['data:image/png;base64,'.length .. -1])
    File.open("#{@@upload_dir}/#{self.filename}", 'wb') do |f|
      f.write(png)
      output = self.filename
    end
    output
  end


end
