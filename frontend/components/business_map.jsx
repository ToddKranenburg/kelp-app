var React = require('react'),
  ReactDOM = require('react-dom'),
  ApiUtil = require('../util/api_util');


var BusinessMap = React.createClass({
  componentDidMount: function () {
    var map = ReactDOM.findDOMNode(this.refs.map),
    options = {
      zoom: 13,
      center: this.props.position,
      zoomControl: false,
      rotateControl: false,
      draggable: false,
      mapTypeControl: false,
      clickable: false
    };
    this.createSingleBusinessMap(map, options);
  },

  createSingleBusinessMap: function (map, options) {
    this.map = new google.maps.Map(map, options);
    var marker = new google.maps.Marker({position: this.props.position});
    marker.setMap(this.map);
  },

  render: function () {
    return (
      <div className="single-business-map">
        <div className="map" ref="map">
        </div>
        <div className="cover-map">
        </div>
      </div>
    );
  }
});

module.exports = BusinessMap;
