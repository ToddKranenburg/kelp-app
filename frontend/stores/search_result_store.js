var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var SearchConstants = require('../constants/users_constants');
var SearchResultStore = new Store(AppDispatcher);

var _searchResults = {};

SearchResultStore.getSearchResults = function () {
  return _searchResults;
};

SearchResultStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SearchConstants.RECEIVE_SEARCH_RESULTS:
      _searchResults = payload.results;
      SearchResultStore.__emitChange();
      break;
  }
};

module.exports = SearchResultStore;
