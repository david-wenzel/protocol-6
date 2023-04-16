class AddAreaIdToProtocols < ActiveRecord::Migration[6.1]
  def change
    add_column :protocols, :area_id, :integer
  end
end
