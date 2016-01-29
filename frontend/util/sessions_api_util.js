var UserActions = require('../actions/user_actions');

var SessionsApiUtil = {
  login: function (sessionParams, success) {
    $.ajax({
      url: "/api/session",
      method: "POST",
      dataType: "json",
      data: sessionParams,
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

  logout: function (success) {
    $.ajax({
      url: "/api/session",
      method: "DELETE",
      dataType: "json",
      success: function (user) {
        UserActions.logoutCurrentUser();
        if (success) {
          success();
        }
      },
      error: function (data) {
        console.log('oh noooo! from logout');
      }
    });
  },

  signUp: function (userParams, success) {
    $.ajax({
      url: "/api/users",
      method: "POST",
      dataType: "json",
      data: userParams,
      success: function (user) {
        UserActions.receiveCurrentUser(user);
        if (success) {
          success();
        }
      },
      error: function (data) {
        console.log('oh noooo! from logout');
      }
    });
  },

  fetchCurrentUser: function (success) {
    $.ajax({
      url: "/api/session",
      method: "GET",
      dataType: "json",
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

module.exports = SessionsApiUtil;
