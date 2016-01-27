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

  fetchReviewsByUserId: function (userId) {
    $.ajax({
      url: "/api/reviews",
      method: "GET",
      dataType: "json",
      data: {user_id: userId},
      success: function (reviews) {
        ReviewActions.receiveAllReviews(reviews);
      },
      error: function (data) {
        console.log('oh noooo! from fetchReviewsByUserId');
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
  },

  fetchReviewById: function (reviewId) {
    $.ajax({
      url: "/api/reviews/" + reviewId,
      method: "GET",
      dataType: "json",
      success: function (review) {
        ReviewActions.receiveSingleReview(review);
      },
      error: function (data) {
        console.log('oh noooo! from fetchReviewById');
      }
    });
  },

  createReview: function (reviewParams) {
    $.ajax({
      url: "/api/reviews",
      method: "post",
      dataType: "json",
      data: reviewParams,
      success: function (review) {
        ReviewActions.receiveSingleReview(review);
      },
      error: function (data) {
        console.log('oh noooo! from fetchReviewById');
      }
    });
  }
};

module.exports = ApiUtil;
