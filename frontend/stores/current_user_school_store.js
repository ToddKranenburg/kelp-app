var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var SchoolConstants = require('../constants/school_constants');
var CurrentUserSchool = new Store(AppDispatcher);

var _currentUserSchoolMembers = {};

CurrentUserSchool.getSchoolMembers = function () {
  var keys = Object.keys(_currentUserSchoolMembers);
  var currentUserSchoolMembers = [];
  for (var i = 0; i < keys.length; i++) {
    currentUserSchoolMembers.push(_currentUserSchoolMembers[keys[i]]);
  }
  return currentUserSchoolMembers;
};

CurrentUserSchool.hasMember = function (memberId) {
  return !!_currentUserSchoolMembers[memberId];
};

CurrentUserSchool.receiveAllSchoolMembers = function (currentUserSchoolMembers) {
  _currentUserSchoolMembers = {};
  for (var i = 0; i < currentUserSchoolMembers.length; i++) {
    var member = currentUserSchoolMembers[i];
    _currentUserSchoolMembers[member.id] = member;
  }
};

CurrentUserSchool.receiveSingleSchoolMember = function (member) {
  _currentUserSchoolMembers[member.id] = member;
};

CurrentUserSchool.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SchoolConstants.RECEIVE_ALL_CURRENT_USER_SCHOOL_MEMBERS:
      CurrentUserSchool.receiveAllSchoolMembers(payload.currentUserSchoolMembers);
      CurrentUserSchool.__emitChange();
      break;
    case SchoolConstants.RECEIVE_SINGLE_CURRENT_USER_SCHOOL_MEMBER:
      CurrentUserSchool.receiveSingleSchoolMember(payload.currentUserSchoolMember);
      CurrentUserSchool.__emitChange();
      break;
  }
};

module.exports = CurrentUserSchool;
