///props = query
///state = index, businesses
var React = require('react'),
  SearchApiUtil = require('../util/search_api_util'),
  BusinessSearchResultStore = require('../stores/business_search_result_store'),
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
        <BusinessesIndex businesses={this.state.businesses}/>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
});

module.exports = SearchResults;
