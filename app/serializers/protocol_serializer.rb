class ProtocolSerializer < ActiveModel::Serializer
  attributes :id, :img_url, :body, :user_id, :area_id
  belongs_to :user
  belongs_to :area
end