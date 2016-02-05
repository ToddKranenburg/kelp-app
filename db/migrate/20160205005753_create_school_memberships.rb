class CreateSchoolMemberships < ActiveRecord::Migration
  def change
    create_table :school_memberships do |t|
      t.integer :school_owner_id, null: false, index: true
      t.integer :school_member_id, null: false, index: true
      t.timestamps null: false
    end
  end
end
