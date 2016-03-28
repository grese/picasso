class ImageSerializer < ActiveModel::Serializer
  attributes :id, :title, :filename
  belongs_to :user
end
