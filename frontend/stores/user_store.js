var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/users_constants');
var UserStore = new Store(AppDispatcher);

var _user;

UserStore.getUser = function () {
  return _user;
};

UserStore.resetUser = function (user) {
  _user = JSON.parse(JSON.stringify(user));
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.RECEIVE_SINGLE_USER:
      UserStore.resetUser(payload.user);
      UserStore.__emitChange();
      break;
  }
};

module.exports = UserStore;
