var SearchActions = require('../actions/search_actions');

var SearchApiUtil = {
  search: function (query) {
    $.ajax({
      url: "/api/search",
      method: "GET",
      dataType: 'json',
      data: {query: query},
      success: function (data) {
        SearchActions.receiveSearchResults(data);
      },
      error: function (data) {
        console.log('oh noooo! from search');
      }
    });
  },

  searchReviews: function (query) {
    $.ajax({
      url: "/api/search",
      method: "GET",
      dataType: 'json',
      data: {query: query, review_search: true},
      success: function (data) {
        SearchActions.receiveBusinessSearchResults(data);
      },
      error: function (data) {
        console.log('oh noooo! from search');
      }
    });
  }

};

module.exports = SearchApiUtil;
