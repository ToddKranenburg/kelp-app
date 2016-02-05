var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var SchoolConstants = require('../constants/school_constants');
var SchoolStore = new Store(AppDispatcher);

var _schoolMembers = {};

SchoolStore.getSchoolMembers = function () {
  var keys = Object.keys(_schoolMembers);
  var schoolMembers = [];
  for (var i = 0; i < keys.length; i++) {
    schoolMembers.push(_schoolMembers[keys[i]]);
  }
  return schoolMembers;
};

SchoolStore.receiveAllSchoolMembers = function (schoolMembers) {
  _schoolMembers = {};
  for (var i = 0; i < schoolMembers.length; i++) {
    var member = schoolMembers[i];
    _schoolMembers[member.id] = member;
  }
};

SchoolStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SchoolConstants.RECEIVE_ALL_SCHOOL_MEMBERS:
      SchoolStore.receiveAllSchoolMembers(payload.schoolMembers);
      SchoolStore.__emitChange();
      break;
  }
};

module.exports = SchoolStore;
