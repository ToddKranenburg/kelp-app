var UsersApiUtil = require('./users_api_util'),
  SchoolActions = require('../actions/school_actions');

var SchoolApiUtil = {
  createSchoolMembership: function (schoolMemberId, success) {
    $.ajax({
      url: "/api/school_memberships",
      method: "POST",
      dataType: 'json',
      data: {school_member_id: schoolMemberId},
      success: function (schoolMembership) {
        UsersApiUtil.fetchCurrentUserById(schoolMembership.school_owner_id);
        UsersApiUtil.fetchUserById(schoolMembership.school_member_id);
        if (success) {
          success();
        }
      },
      error: function (data) {
        console.log('oh noooo! from createSchoolMembership');
      }
    });
  },

  fetchSchoolMembersByOwnerId: function (schoolOwnerId, success) {
    $.ajax({
      url: "/api/users",
      method: "GET",
      dataType: 'json',
      data: {owner_id: schoolOwnerId},
      success: function (schoolMembers) {
        SchoolActions.receiveAllSchoolMembers(schoolMembers);
        if (success) {
          success();
        }
      },
      error: function (data) {
        console.log('oh noooo! from fetchSchoolMembers');
      }
    });
  }
};

module.exports = SchoolApiUtil;
