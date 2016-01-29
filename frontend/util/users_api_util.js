var UserActions = require('../actions/user_actions');

var UsersApiUtil = {
  updateUser: function (userParams, currentUserId, success) {
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
  }
};

module.exports = UsersApiUtil;
