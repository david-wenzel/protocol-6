class Protocol < ApplicationRecord
    belongs_to :user
    belongs_to :area
  
    validates :img_url, :body, presence: true
end
