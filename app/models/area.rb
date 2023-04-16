class Area < ApplicationRecord
    has_many :protocols, dependent: :destroy
    has_many :users, through: :protocols

    validates :title, presence: true, uniqueness: true
end
