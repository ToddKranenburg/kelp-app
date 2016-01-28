var ReviewActions = require('../actions/review_actions');
var UserActions = require('../actions/user_actions');
var BusinessActions = require('../actions/business_actions');

var ApiUtil = {
  createReview: function (reviewParams) {
    $.ajax({
      url: "/api/reviews",
      method: "POST",
      dataType: "json",
      data: reviewParams,
      success: function (review) {
        ReviewActions.receiveSingleReview(review);
      },
      error: function (data) {
        console.log('oh noooo! from fetchReviewById');
      }
    });
  },

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

  fetchBusinessById: function (businessId) {
    $.ajax({
      url: "/api/businesses/" + businessId,
      method: "GET",
      dataType: "json",
      success: function (business) {
        BusinessActions.receiveSingleBusiness(business);
      },
      error: function (data) {
        console.log('oh noooo! from fetchBusinessById');
      }
    });
  }


};

module.exports = ApiUtil;
