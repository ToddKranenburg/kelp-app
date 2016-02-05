class SchoolMembership < ActiveRecord::Base
  belongs_to :school_owner, class_name: "User", foreign_key: :school_owner_id
  belongs_to :school_member, class_name: "User", foreign_key: :school_member_id

  validates :school_owner, :school_member, presence: true
  validates :school_member_id, uniqueness: {scope: :school_owner_id}
end
