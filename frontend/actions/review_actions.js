var AppDispatcher = require('../dispatcher/dispatcher');
var ReviewConstants = require('../constants/review_constants');

var ReviewActions = {
  receiveAllReviews: function (reviews) {
    var payload = {
      actionType: ReviewConstants.RECEIVE_ALL_REVIEWS,
      reviews: reviews
    };
    AppDispatcher.dispatch(payload);
  },

  receiveSingleReview: function (review) {
    var payload = {
      actionType: ReviewConstants.RECEIVE_SINGLE_REVIEW,
      review: review
    };
    AppDispatcher.dispatch(payload);
  }
};

module.exports = ReviewActions;
