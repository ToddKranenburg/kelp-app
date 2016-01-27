var ReviewActions = require('../actions/review_actions');
var UserActions = require('../actions/user_actions');

var ApiUtil = {
  fetchAllReviews: function () {
    $.ajax({
      url: "/api/reviews",
      method: "GET",
      dataType: "json",
      success: function (reviews) {
        ReviewActions.receiveAllReviews(reviews);
      },
      error: function (data) {
        console.log('oh noooo! from fetchAllReviews');
      }
    });
  },

  fetchUserById: function (userId) {
    $.ajax({
      url: "/api/users/" + userId,
      method: "GET",
      dataType: "json",
      data: {user_id: userId},
      success: function (user) {
        UserActions.receiveSingleUser(user);
      },
      error: function (data) {
        console.log('oh noooo! from fetchUserById');
      }
    });
  }
};

module.exports = ApiUtil;
