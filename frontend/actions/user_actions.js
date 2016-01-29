var AppDispatcher = require('../dispatcher/dispatcher'),
  UserConstants = require('../constants/users_constants');

var UserActions = {
  receiveSingleUser: function (user) {
    var payload = {
      actionType: UserConstants.RECEIVE_SINGLE_USER,
      user: user
    };
    AppDispatcher.dispatch(payload);
  },

  receiveCurrentUser: function (user) {
    var payload = {
      actionType: UserConstants.RECEIVE_CURRENT_USER,
      currentUser: user
    };
    AppDispatcher.dispatch(payload);
  },

  logoutCurrentUser: function () {
    var payload = {
      actionType: UserConstants.LOGOUT
    };
    AppDispatcher.dispatch(payload);
  }

};

module.exports = UserActions;
