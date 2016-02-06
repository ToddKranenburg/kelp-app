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
        var allReviews = [];
        reviews.forEach(function (userReviews) {
          userReviews.forEach(function (review) {
            allReviews.push(review);
          });
        });
        ReviewActions.receiveAllReviews(allReviews);
      },
      error: function (data) {
        console.log('oh noooo! from fetchReviewsByUserId');
      }
    });
  },

  fetchSchoolReviewsByOwnerId: function (ownerId) {
    $.ajax({
      url: "/api/reviews",
      method: "GET",
      dataType: "json",
      data: {owner_id: ownerId},
      success: function (reviews) {
        ReviewActions.receiveAllReviews(reviews);
      },
      error: function (data) {
        console.log('oh noooo! from fetchSchoolReviewsByOwnerId');
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
  },




};

module.exports = ApiUtil;
