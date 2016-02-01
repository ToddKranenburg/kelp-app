var React = require('react'),
  ReactRouter = require('react-router'),
  ApiUtil = require('../../util/api_util'),
  ReviewForm = require('../reviews/review_form'),
  ReviewsIndex = require('../reviews/reviews_index'),
  Map = require('../map'),
  BusinessStore = require('../../stores/business_store'),
  BusinessApiUtil = require('../../util/business_api_util'),
  History = ReactRouter.History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var BusinessForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return {name: null, lat: 0, lng: 0, place_id: ""};
  },

  fillForm: function (place) {
    return function () {
      this.setState({name: place.name, lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), place_id: place.id});
    }.bind(this);
  },

  submitForm: function (e) {
    e.preventDefault();
    var businessParams = {
      business: {
        name: this.state.name,
        lat: this.state.lat,
        lng: this.state.lng,
        place_id: this.state.place_id
      }
    };

    BusinessApiUtil.createBusiness(businessParams, function (id) {
      this.history.pushState({}, "/businesses/" + id);
    }.bind(this));
  },

  render: function () {
    var button;
    if (this.state.name) {
      button = <button>Add {this.state.name}</button>;
    }
    return (
      <div className="business-form">
        <h2 className="business-form-header">Add a Business</h2>
        <Map fillForm={this.fillForm} businessForm={true}/>
        <form onSubmit={this.submitForm}>
          <input type="hidden" value={this.state.name} name="name"/>
          <input type="hidden" value={this.state.lat} name="lat"/>
          <input type="hidden" value={this.state.lng} name="lng"/>
          <input type="hidden" value={this.state.place_id} name="place_id"/>
          {button}
        </form>
      </div>
      // {this.props.children}
      // <BusinessFormDetail
      //   name={this.state.name}
      //   lat={this.state.lat}
      //   lng={this.state.lng}
      //   placeId={this.state.place_id}
      // />
    );
  }
});


module.exports = BusinessForm;
