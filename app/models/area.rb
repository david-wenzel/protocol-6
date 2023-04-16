class Area < ApplicationRecord
    has_many :protocols, dependent: :destroy

    validates :title, presence: true, uniqueness: true
end
