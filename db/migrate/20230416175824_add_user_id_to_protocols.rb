class AddUserIdToProtocols < ActiveRecord::Migration[6.1]
  def change
    add_column :protocols, :user_id, :integer
  end
end
