class AddPlaceIdToBusinesses < ActiveRecord::Migration
  def change
    add_column :businesses, :place_id, :string, null: false, index: true, unique: true
  end
end
