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
  },

  clickResult: function (item) {
    var url;
    if (item._type === "Business") {
      url = "businesses/" + item.id;
    } else if (item._type === "User") {
      url = "users/" + item.id;
    }

    return (function () {
      this.history.pushState({}, url);
      this.searched = true;
      this.setState({page: 1, query: ""});
    }.bind(this));
  },

  render: function () {
    var results = SearchResultStore.getSearchResults().results || [];
    if (this.searched) {
      results = [];
      this.searched = false;
      SearchApiUtil.search("");
    }
    var searchResultItems = [];
    for (var i = 0; i < results.length; i++) {
      item = results[i];
      var content;
      var imageUrl;
      if (item._type === "Business") {
        imageUrl = item.image_urls[0] || {image_url: window.defaultBusinessPhoto};
        content =
          <div>
            <img className="search-image" src={imageUrl.image_url}/>
            <div className="search-content">
              <div className="search-words">
                {item.name}
              </div>
            </div>
          </div>;
      } else if (item._type === "User") {
        content =
          <div>
            <img className="search-image" src={item.image_url}/>
              <div className="search-content">
                <div className="search-words">
                  {item.username}
                </div>
              </div>
          </div>;
      }

      searchResultItems.push(
        <li className="search-bar-results-item group" key={i} onClick={this.clickResult(item)}>
          {content}
        </li>
      );
    }

    var searchResult;
    if (results.length > 0) {
      searchResult = <ul className="search-bar-results">{searchResultItems}</ul>;
    }

    return (
      <div className="search-bar">
        <input type="text" placeholder="Search for users or businesses" onKeyUp={this.pgSearch} className="search-bar-input" valueLink={this.linkState('query')}></input>
        {searchResult}
      </div>
    );
  }
});

module.exports = Search;
