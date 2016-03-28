class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :images
  has_many :images
end
