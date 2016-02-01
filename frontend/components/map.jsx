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

//change this for specific cities!
  searchMap: function () {
    this.markers = this.markers || [];
    for (var j = 0; j < this.markers.length; j++) {
      var marker = this.markers[j].marker;
      marker.setMap(null);
    }
    this.markers = [];

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
      this.setState({places: newPlaces});
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
          this.markers[i].marker.setAnimation(google.maps.Animation.BOUNCE);
          this.unbounceMarker();
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

  render: function () {
    var places = [];
    var placeList;

    if (this.state.places) {
      var i = (10 * this.state.index);
      for (var j = 0; j < 10 && i < this.state.places.length ; j++) {
        var place = this.state.places[i];
        this.createMarker(place);
        var content;
        if (this.props.businessForm) {
          content = <button onClick={this.props.fillForm(place)}>Add {place.name} to Kelp!</button>;
        }
        places.push(
          <li key={place.id} onMouseEnter={this.bounceMarker(place.id)} onMouseLeave={this.unbounceMarker} onClick={this.centerMap(place)}>
            {place.name}
            {content}
          </li>
        );
        i++;
      }
      placeList = <ul>{places}</ul>;
    }

    return (
      <div>
        <div className="map" ref="map">
        </div>
        <form className="map-search" onSubmit={this.searchMap}>
          <input
            type="text"
            className="map-search-input"
            valueLink={this.linkState('query')}>
          </input>
          <button className="map-button"></button>
        </form>
        {placeList}
      </div>
    );
  }
});

module.exports = Map;
