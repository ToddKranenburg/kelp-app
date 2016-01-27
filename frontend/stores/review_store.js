var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var ReviewConstants = require('../constants/review_constants');
var ReviewStore = new Store(AppDispatcher);

var _reviews = {};

ReviewStore.all = function () {
  var keys = Object.keys(_reviews);
  var allReviews = [];

  for (var i = 0; i < keys.length; i++) {
    allReviews.push(_reviews[keys[i]]);
  }


  return allReviews;
};

ReviewStore.resetReviews = function (reviews) {
  _reviews = {};
  for (var i = 0; i < reviews.length; i++) {
    _reviews[reviews[i].id] = reviews[i];
  }
};

ReviewStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case ReviewConstants.RECEIVE_ALL_REVIEWS:
      ReviewStore.resetReviews(payload.reviews);
      ReviewStore.__emitChange();
      break;
  }
};

module.exports = ReviewStore;
