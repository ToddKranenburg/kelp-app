var AppDispatcher = require('../dispatcher/dispatcher'),
  UserConstants = require('../constants/users_constants');

var UserActions = {
  receiveSingleUser: function (user) {
    var payload = {
      actionType: UserConstants.RECEIVE_SINGLE_USER,
      user: user
    };
    AppDispatcher.dispatch(payload);
  }
};

module.exports = UserActions;
