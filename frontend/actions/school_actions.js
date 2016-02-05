var AppDispatcher = require('../dispatcher/dispatcher');
var SchoolConstants = require('../constants/school_constants');

var SchoolActions = {
  receiveAllSchoolMembers: function (schoolMembers) {
    var payload = {
      actionType: SchoolConstants.RECEIVE_ALL_SCHOOL_MEMBERS,
      schoolMembers: schoolMembers
    };
    AppDispatcher.dispatch(payload);
  },

  receiveAllCurrentUserSchoolMembers: function (schoolMembers) {
    var payload = {
      actionType: SchoolConstants.RECEIVE_ALL_CURRENT_USER_SCHOOL_MEMBERS,
      currentUserSchoolMembers: schoolMembers
    };
    AppDispatcher.dispatch(payload);
  },

  receiveSingleCurrentUserSchoolMember: function (schoolMember) {
    var payload = {
      actionType: SchoolConstants.RECEIVE_SINGLE_CURRENT_USER_SCHOOL_MEMBER,
      currentUserSchoolMember: schoolMember
    };
    AppDispatcher.dispatch(payload);
  },

};

module.exports = SchoolActions;
