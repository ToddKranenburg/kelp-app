var UserActions = require('../actions/user_actions');

var UsersApiUtil = {
  updateCurrentUser: function (userParams, currentUserId, success) {
    $.ajax({
      url: "/api/users/" + currentUserId,
      method: "PATCH",
      processData: false,
      contentType: false,
      dataType: 'json',
      data: userParams,
      success: function (user) {
        UserActions.receiveCurrentUser(user);
        if (success) {
          success();
        }
      },
      error: function (data) {
        console.log('oh noooo! from login');
      }
    });
  },

  fetchUserById: function (userId, success) {
    $.ajax({
      url: "/api/users/" + userId,
      method: "GET",
      dataType: "json",
      data: {user_id: userId},
      success: function (user) {
        UserActions.receiveSingleUser(user);
        if (success) {
          success(user.id);
        }
      },
      error: function (data) {
        console.log('oh noooo! from fetchUserById');
      }
    });
  },

  fetchCurrentUserById: function (currentUserId, success) {
    $.ajax({
      url: "/api/users/" + currentUserId,
      method: "GET",
      dataType: "json",
      data: {user_id: currentUserId},
      success: function (user) {
        UserActions.receiveCurrentUser(user);
        if (success) {
          success();
        }
      },
      error: function (data) {
        console.log('oh noooo! from fetchCurrentUserById');
      }
    });
  }

};

module.exports = UsersApiUtil;
