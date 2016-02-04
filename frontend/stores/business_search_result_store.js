var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var SearchConstants = require('../constants/search_constants');
var BusinessSearchResultStore = new Store(AppDispatcher);

var _searchResults = {};

BusinessSearchResultStore.getBusinessSearchResults = function () {
  return _searchResults;
};

BusinessSearchResultStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SearchConstants.RECEIVE_BUSINESS_SEARCH_RESULTS:
      _searchResults = payload.results;
      BusinessSearchResultStore.__emitChange();
      break;
  }
};

module.exports = BusinessSearchResultStore;
