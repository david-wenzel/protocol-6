class AreaSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :protocols
end
