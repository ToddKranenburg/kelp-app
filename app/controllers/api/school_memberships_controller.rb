class Api::SchoolMembershipsController < ApplicationController
  def create
    school_owner_id = current_user.id
    @school_membership = SchoolMembership.create!(school_owner_id: school_owner_id, school_member_id: params[:school_member_id])
  end

  def destroy
    @school_membership = SchoolMembership.find(params[:id])
    @school.destroy!
  end
end
