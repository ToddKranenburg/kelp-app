var React = require('react'),
  ReactDOM = require('react-dom'),
  ApiUtil = require('../util/api_util');
var LinkedStateMixin = require('react-addons-linked-state-mixin');


var Map = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      businesses: null,
      query: "",
      places: null,
      index: 0,
      bounds: null
    };
  },

  componentDidMount: function () {
    var map = ReactDOM.findDOMNode(this.refs.map),
    options = {
      zoom: 13,
      center: {lat: 40.725136, lng: -73.996900}
    };
    var lat, lng;
    this.createChooseBusinessMap(map, options);
  },

  clearMarkers: function () {
    this.markers = this.markers || [];
    for (var j = 0; j < this.markers.length; j++) {
      var marker = this.markers[j].marker;
      marker.setMap(null);
    }
    this.markers = [];
  },

//change this for specific cities!
  searchMap: function () {
    this.clearMarkers();

    var request = {
      query: this.state.query,
    };
    if (this.state.bounds) {
      request.bounds = this.state.bounds;
    }

    var newPlaces = [];
    var service = new google.maps.places.PlacesService(this.map);
    service.textSearch(request, function (results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          newPlaces.push(place);
        }
      }
      this.setState({places: newPlaces, index: 0});
    }.bind(this));

  },

  createMarker: function (place) {
    var position = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
    var marker = new google.maps.Marker({position: position});

    this.markers.push({marker: marker, id: place.id});
    marker.setMap(this.map);
    // marker.addListener('click')
  },

  bounceMarker: function (id) {
    return function () {
      for (var i = 0; i < this.markers.length; i++) {
        if (this.markers[i].id === id) {
          this.unbounceMarker();
          this.markers[i].marker.setAnimation(google.maps.Animation.BOUNCE);
          this.bouncingMarker = this.markers[i].marker;
        }
      }
    }.bind(this);
  },

  unbounceMarker: function () {
    if (this.bouncingMarker) {
      this.bouncingMarker.setAnimation(null);
    }
  },

  centerMap: function (place) {
    return function () {
      this.map.setCenter({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()});
    }.bind(this);
  },

  createChooseBusinessMap: function (map, options) {
    this.map = new google.maps.Map(map, options);
    this.map.addListener('idle', function() {
      var bounds = this.map.getBounds();
      this.setState({bounds: bounds});
    }.bind(this));
    // this.forceUpdate();
  },

  indexForwards: function () {
    this.clearMarkers();
    this.setState({index: (this.state.index + 1)});
  },

  indexBackwards: function () {
    this.clearMarkers();
    this.setState({index: (this.state.index - 1)});
  },

  render: function () {
    var places = [];
    var placeList;
    var displayNumber = 9;
    if (this.state.places) {
      var i = (displayNumber * this.state.index);
      for (var j = 0; j < displayNumber && i < this.state.places.length ; j++) {
        var place = this.state.places[i];
        this.createMarker(place);
        var content;
        if (this.props.businessForm) {
          content = <i onClick={this.props.fillForm(place)} className="fa fa-plus"/>;
        }
        var address = place.formatted_address.split(', ');
        address = address[0] + ', ' + address[1] + ', ' + address[2];
        places.push(
          <li className="search-list-item" key={place.id} onMouseEnter={this.bounceMarker(place.id)} onMouseLeave={this.unbounceMarker} onClick={this.centerMap(place)}>
            <img className="search-icon" src={place.icon}/>
            <div className="search-list-item-info"><h2 className="search-list-name">{place.name}</h2> <h3 className="search-list-address">{address}</h3></div>
            {content}
          </li>
        );
        i++;
      }

      var nextButton;
      var prevButton;
      if (i < this.state.places.length - 1) {
        nextButton = <button className="my-button map-search-button-next" onClick={this.indexForwards}>Next Page</button>;
      }
      if (this.state.index > 0) {
        prevButton = <button className="my-button map-search-button-prev" onClick={this.indexBackwards}>Prev Page</button>;
      }
      placeList = (<ul className="map-search-results">
        {places}
        <div className="map-search-result-buttons group">

          {prevButton}
          <div className="page-index">Page {this.state.index + 1} of {Math.ceil(this.state.places.length / displayNumber)}</div>
          {nextButton}
        </div>
      </ul>);
    }
    return (
      <div className="map-group">
        <div className="map-wrapper">
          <div className="map" ref="map">
          </div>
        </div>
        <form className="map-search" onSubmit={this.searchMap}>
          <input
            type="text"
            className="map-search-input"
            valueLink={this.linkState('query')}
            placeholder="Search for businesses...">
          </input>
          <button className="map-button my-button">Search</button>
        </form>
        <h3 className="map-search-results-header">Search Results</h3>
        {placeList}
      </div>
    );
  }
});

module.exports = Map;
