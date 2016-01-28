class CreateBusinesses < ActiveRecord::Migration
  def change
    create_table :businesses do |t|
      t.string :name, null: false
      t.string :type, null: false, index: true
      t.integer :lat, null: false
      t.integer :lng, null: false

      t.timestamps null: false
    end
  end
end
