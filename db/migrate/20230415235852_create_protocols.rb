class CreateProtocols < ActiveRecord::Migration[6.1]
  def change
    create_table :protocols do |t|
      t.string :title
      t.string :body
      t.string :img_url

      t.timestamps
    end
  end
end
