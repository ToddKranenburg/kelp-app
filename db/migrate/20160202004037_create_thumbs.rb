class CreateThumbs < ActiveRecord::Migration
  def change
    create_table :thumbs do |t|
      t.integer :business_id, null: false, index: true

      t.timestamps null: false
    end
  end
end
