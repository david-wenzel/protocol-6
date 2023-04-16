class SavedProtocol < ApplicationRecord
    belongs_to :user
    belongs_to :protocol
end
