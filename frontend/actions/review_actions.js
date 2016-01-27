var AppDispatcher = require('../dispatcher/dispatcher');
var ReviewConstants = require('../constants/review_constants');

var ReviewActions = {
  receiveAllReviews: function (reviews) {
    var payload = {
      actionType: ReviewConstants.RECEIVE_ALL_REVIEWS,
      reviews: reviews
    };
    AppDispatcher.dispatch(payload);
  }
};

module.exports = ReviewActions;
