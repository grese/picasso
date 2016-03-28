class ImageSerializer < ActiveModel::Serializer
  attributes :id, :user, :title, :filename
end
