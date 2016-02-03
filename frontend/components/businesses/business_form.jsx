var React = require('react'),
  ReactRouter = require('react-router'),
  ApiUtil = require('../../util/api_util'),
  ReviewForm = require('../reviews/review_form'),
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
    return {name: null, lat: 0, lng: 0, place_id: "", imageFile: null, imageUrl: ""};
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

    BusinessApiUtil.createBusiness(businessParams, function (businessId) {
      var formData = new FormData();
      if (this.state.imageFile) {
        formData.append("image", this.state.imageFile);
        ThumbApiUtil.createThumb(formData, businessId, this.completeBusinessCreation(businessId));
      } else {
        this.completeBusinessCreation(businessId)();
      }

    }.bind(this));
  },

  completeBusinessCreation: function (businessId) {
    return function () {
      this.history.pushState({}, "/businesses/" + businessId);
    }.bind(this);
  },

  changeFile: function (e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function () {
      this.setState({imageFile: file, imageUrl: reader.result});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({imageFile: null, imageUrl: ""});
    }
  },

  render: function () {
    var formContent;
    if (this.state.name) {
      formContent = (
        <div className="business-form-content">
          <h1 className="business-form-content-name">{this.state.name}</h1>
          <h2 className="business-form-photo-upload">Upload a photograph of {this.state.name}</h2>
          <div className="thumb">
            <img className="preview-image" src={this.state.imageUrl}/>
          </div>
          <input className="profile-picture-upload-button" type="file" onChange={this.changeFile}/>
          <button className="my-button business-form-button">Add {this.state.name}</button>
        </div>
    );
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
          {formContent}
        </form>
      </div>
    );
  }
});


module.exports = BusinessForm;
