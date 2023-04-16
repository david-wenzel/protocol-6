class CreateSavedProtocols < ActiveRecord::Migration[6.1]
  def change
    create_table :saved_protocols do |t|
      t.integer :protocol_id
      t.integer :user_id

      t.timestamps
    end
  end
end
