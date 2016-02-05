var AppDispatcher = require('../dispatcher/dispatcher');
var SchoolConstants = require('../constants/school_constants');

var SchoolActions = {
  receiveAllSchoolMembers: function (schoolMembers) {
    var payload = {
      actionType: SchoolConstants.RECEIVE_ALL_SCHOOL_MEMBERS,
      schoolMembers: schoolMembers
    };
    AppDispatcher.dispatch(payload);
  }
};

module.exports = SchoolActions;
