class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.text :body, null: false
      t.integer :rating, null: false
      t.integer :author_id, null: false, index: true
      t.timestamps null: false
    end
  end
end
