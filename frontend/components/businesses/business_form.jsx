var React = require('react'),
  ReactRouter = require('react-router'),
  ApiUtil = require('../../util/api_util'),
  BusinessFormModal = require('../business_form_modal'),
  ReviewsIndex = require('../reviews/reviews_index'),
  Map = require('../map'),
  BusinessStore = require('../../stores/business_store'),
  BusinessApiUtil = require('../../util/business_api_util'),
  ThumbApiUtil = require('../../util/thumb_api_util'),
  History = ReactRouter.History,
  LinkedStateMixin = require('react-addons-linked-state-mixin');

var BusinessForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return {name: null, lat: 0, lng: 0, place_id: "", modalIsOpen: false};
  },

  addBusiness: function (place) {
    return function () {
      this.setState({
        name: place.name,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        place_id: place.id,
        modalIsOpen: true
      });
    }.bind(this);
  },

  submitForm: function (callback) {
    var businessParams = {
      business: {
        name: this.state.name,
        lat: this.state.lat,
        lng: this.state.lng,
        place_id: this.state.place_id
      }
    };

    BusinessApiUtil.createBusiness(businessParams, callback);
  },

  completeBusinessCreation: function (businessId) {
    return function () {
      this.history.pushState({}, "/businesses/" + businessId);
    }.bind(this);
  },

  closeModal: function () {
    this.setState({name: null, lat: 0, lng: 0, place_id: "", modalIsOpen: false});
  },

  render: function () {
    return (
      <div className="business-form">
        <h2 className="business-form-header">Add a Business</h2>
        <Map addBusiness={this.addBusiness} businessForm={true}/>
        <form onSubmit={this.submitForm}>
          <input type="hidden" value={this.state.name} name="name"/>
          <input type="hidden" value={this.state.lat} name="lat"/>
          <input type="hidden" value={this.state.lng} name="lng"/>
          <input type="hidden" value={this.state.place_id} name="place_id"/>
        </form>
        <BusinessFormModal
          completeBusinessCreation={this.completeBusinessCreation}
          submitForm={this.submitForm}
          modalIsOpen={this.state.modalIsOpen}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
});


module.exports = BusinessForm;
