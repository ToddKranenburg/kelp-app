var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/users_constants');
var CurrentUserStore = new Store(AppDispatcher);

var _currentUser = {};
var _currentUserHasBeenFetched = false;

CurrentUserStore.getCurrentUser = function () {
  return $.extend({}, _currentUser);
};

CurrentUserStore.isLoggedIn = function () {
  return !!(_currentUser.id);
};

CurrentUserStore.userHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

CurrentUserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.RECEIVE_CURRENT_USER:
      _currentUserHasBeenFetched = true;
      _currentUser = payload.currentUser;
      CurrentUserStore.__emitChange();
      break;
    case UserConstants.LOGOUT:
      _currentUser = {};
      _currentUserHasBeenFetched = false;
      CurrentUserStore.__emitChange();
      break;
  }
};

module.exports = CurrentUserStore;
