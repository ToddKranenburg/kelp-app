var ReviewActions = require('../actions/review_actions');

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
        console.log('oh noooo!');
      }
    });
  }
};

module.exports = ApiUtil;
