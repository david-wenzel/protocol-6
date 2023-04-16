class User < ApplicationRecord
    has_many :protocols
    has_many :saved_protocols
    has_many :favorite_protocols, through: :saved_protocols, source: :protocol

    has_secure_password

    validates :username, presence: true, uniqueness: true
end
