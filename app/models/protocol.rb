class Protocol < ApplicationRecord
    belongs_to :user
    belongs_to :area
    has_many :saved_protocols
    has_many :users, through: :saved_protocols
  
    validates :img_url, :body, :title, presence: true
end
