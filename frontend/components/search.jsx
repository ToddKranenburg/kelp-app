var SearchApiUtil = require('../util/search_api_util'),
  SearchResultStore = require('../stores/search_result_store'),
  History = require('react-router').History,
  LinkedStateMixin = require('react-addons-linked-state-mixin'),
  React = require('react');

var Search = React.createClass({
  mixins: [History, LinkedStateMixin],

  getInitialState: function () {
    return {query: "", page: 1};
  },

  componentDidMount: function () {
    this.resultStoreListener = SearchResultStore.addListener(this._onChange);
    this.addEnterListener();
  },

  componentWillUnmount: function () {
    this.resultStoreListener.remove();
  },

  _onChange: function () {
    this.forceUpdate();
  },

  pgSearch: function () {
    SearchApiUtil.search(this.state.query);
    this.setState({page: 1});
    this.clicked = false;
  },

  clickResult: function (item) {
    var url;

    if (item._type === "Business") {
      url = "businesses/" + item.id;
    } else {
      url = "users/" + item.id;
    }

    return (function () {
      this.clicked = true;
      this.history.pushState({}, url);
      this.setState({query: ""});
    }.bind(this));
  },

  searchReviews: function () {
    var query = this.state.query;
    this.clicked = true;
    this.setState({query: ""}, function () {
      this.history.pushState(query, 'search-results');
    }.bind(this));
    // SearchApiUtil.searchReviews(this.state.query);
  },

  addEnterListener: function () {
    if (this.enterListenerAdded) {
      return;
    }

    var searchReviews = this.searchReviews;
    $(".search-bar-input").keypress(function (e) {
      if (e.which === 13) {
        searchReviews();
      }
    });

    this.enterListenerAdded = true;
  },

  render: function () {
    var results;
    if (this.clicked) {
      results = [];
    } else {
      results = SearchResultStore.getSearchResults().results || [];
    }
    var searchResultItems = [];
    for (var i = 0; i < results.length; i++) {
      item = results[i];
      var content;
      var imageUrl;
      if (item._type === "Business") {
        imageUrl = item.image_urls[0] || {image_url: window.defaultBusinessPhoto};
        imageUrl = imageUrl.image_url;
        content = item.name;
      } else if (item._type === "User") {
        imageUrl = item.image_url;
        content = item.username;
      }

      searchResultItems.push(
        <li className="search-bar-results-item group" key={i} onClick={this.clickResult(item)}>
          <img className="search-image" src={imageUrl}/>
          <div className="search-content">
            <div className="search-words">
              {content}
            </div>
          </div>
        </li>
      );
    }

    var searchResult;
    if (results.length > 0) {
      searchResult = <ul className="search-bar-results">{searchResultItems}</ul>;
    }

    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for users or businesses"
          onKeyUp={this.pgSearch}
          onFocus={this.addEnterListener}
          onBlur={this.removeEnterListener}
          className="search-bar-input"
          valueLink={this.linkState('query')}>
        </input>
        {searchResult}
        <button className="my-search-button" onClick={this.searchReviews}><i className="fa fa-search"></i></button>
      </div>
    );
  }
});

module.exports = Search;
