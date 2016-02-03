var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/users_constants');
var OtherUserStore = new Store(AppDispatcher);

var _otherUser = {};

OtherUserStore.getOtherUser = function () {
  return $.extend({}, _otherUser);
};

OtherUserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.RECEIVE_SINGLE_USER:
      _otherUser = payload.user;
      OtherUserStore.__emitChange();
      break;
  }
};

module.exports = OtherUserStore;
