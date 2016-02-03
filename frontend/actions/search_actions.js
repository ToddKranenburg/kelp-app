var AppDispatcher = require('../dispatcher/dispatcher'),
  SearchConstants = require('../constants/business_constants');

var SearchActions = {
  receiveSearchResults: function (results) {
    var payload = {
      actionType: SearchConstants.RECEIVE_SEARCH_RESULTS,
      results: results
    };
    AppDispatcher.dispatch(payload);
  }
};

module.exports = SearchActions;
