///props = query
///state = index, businesses
var React = require('react'),
  SearchApiUtil = require('../util/search_api_util'),
  BusinessSearchResultStore = require('../stores/business_search_result_store'),
  SearchResultsMap = require('./search_results_map'),
  BusinessesIndex = require('./businesses/business_index');

var SearchResults = React.createClass({
  getInitialState: function () {
    return ({businesses: null});
  },

  componentDidMount: function () {
    this.searchResultStoreListener = BusinessSearchResultStore.addListener(this.resultsChanged);
    SearchApiUtil.searchReviews(this.props.location.state);
  },

  componentWillUnmount: function () {
    this.searchResultStoreListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    SearchApiUtil.searchReviews(newProps.location.state);
  },

  resultsChanged: function () {
    this.setState({businesses: BusinessSearchResultStore.getBusinessSearchResults()});
  },

  render: function () {
    if (this.state.businesses) {
      return (
        <div className="group">
          <div className="business-search-results-header">
            <h2>Showing results for '{this.props.location.state}'...</h2>
          </div>
          <BusinessesIndex businesses={this.state.businesses}/>
          <SearchResultsMap businesses={this.state.businesses}/>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
});

module.exports = SearchResults;
