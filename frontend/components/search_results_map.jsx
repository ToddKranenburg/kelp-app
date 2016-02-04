var React = require('react'),
  ReactDOM = require('react-dom'),
  ApiUtil = require('../util/api_util');


var SearchResultsMap = React.createClass({
  getInitialState: function ()  {
    var all_results = this.props.businesses.business_results.concat(this.props.businesses.review_results);
    return {businesses: all_results};
  },

  componentDidMount: function () {
    var businesses = this.props.businesses.business_results.concat(this.props.businesses.review_results);
    this.newMap(businesses);
  },

  componentWillReceiveProps: function (newProps) {
    var businesses = newProps.businesses.business_results.concat(newProps.businesses.review_results);
    this.newMap(businesses);
  },

  newMap: function (businesses) {
    var center;

    var centerBusiness = businesses[0];
    if (centerBusiness) {
      center = {lat: centerBusiness.lat, lng: centerBusiness.lng};
    } else {
      center = {lat: 42.333, lng: -74.333};
    }
    var map = ReactDOM.findDOMNode(this.refs.map),
    options = {
      zoom: 13,
      center: center
    };
    this.createSearchResultsMap(map, options, businesses);
  },

  createSearchResultsMap: function (map, options, businesses) {
    this.map = new google.maps.Map(map, options);
    var businessIds = {};
    var i = 0;
    businesses.forEach(function (business) {
      if (businessIds[business.id]) {
        return;
      } else {
        i++;
      }
      var position = {lat: business.lat, lng: business.lng};
      var marker = new google.maps.Marker({
        position: position,
        businessId: business.id,
        icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + i + '|FF0000|000000'
      });
      marker.setMap(this.map);
      businessIds[business.id] = true;
    }.bind(this));
  },

  render: function () {
    return (
      <div className="search-results-map">
        <div className="map" ref="map">
        </div>
      </div>
    );
  }
});

module.exports = SearchResultsMap;
