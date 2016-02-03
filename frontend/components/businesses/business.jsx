var React = require('react'),
  ApiUtil = require('../../util/api_util'),
  ThumbApiUtil = require('../../util/thumb_api_util'),
  ReviewForm = require('../reviews/review_form'),
  ImageModal = require('../image_modal'),
  BusinessMap = require('../business_map'),
  ReviewsIndex = require('../reviews/reviews_index'),
  BusinessStore = require('../../stores/business_store'),
  ReviewStore = require('../../stores/review_store');

var Business = React.createClass({
  getInitialState: function () {
      return ({
        business: null,
        showForm: false,
        hoveringId: -1,
        modalIsOpen: false
      });
  },

  componentDidMount: function () {
    this.businessStoreListener = BusinessStore.addListener(this.businessChanged);
    this.reviewStoreListener = ReviewStore.addListener(this.reviewsChanged);
    ApiUtil.fetchBusinessById(this.props.params.id);
  },

  componentWillUnmount: function () {
    this.businessStoreListener.remove();
    this.reviewStoreListener.remove();
  },

  businessChanged: function () {
    var businessId = this.props.params.id;
    this.setState({business: BusinessStore.getBusinessById(businessId)});
  },

  reviewsChanged: function () {
    ApiUtil.fetchBusinessById(this.props.params.id);
  },

  thumbsChanged: function () {
    ApiUtil.fetchBusinessById(this.props.params.id);
  },

  toggleForm: function () {
    var showForm = this.state.showForm;
    this.setState({showForm: !showForm});
  },

  setHoveringThumb: function (index) {
    return function () {
      this.setState({hoveringId: index});
    }.bind(this);
  },

  resetHoveringThumb: function () {
    this.setState({hoveringId: -1});
  },

  submitForm: function () {
    this.setState({showForm: false});
  },

  toggleModal: function () {
    this.setState({modalIsOpen: !this.state.modalIsOpen});
  },

  closeModal: function () {
    this.setState({modalIsOpen: false});
  },

  uploadImage: function (e, imageFile) {
    e.preventDefault();

    var formData = new FormData();
    formData.append("image", imageFile);
    var businessId = this.state.business.id;
    var thumbsChanged = this.thumbsChanged;
    ThumbApiUtil.createThumb(formData, businessId, thumbsChanged);
    this.closeModal();
  },

  render: function () {
    var business = this.state.business;
    var images = [];
    if (business) {
      var buttonContent;
      var businessContent;

      if (this.state.showForm) {
        buttonContent = "Show Reviews";
        businessContent = (
          <div className="business-content business-review-form">
            <ReviewForm business={business} submitForm={this.submitForm}/>
          </div>
        );
      } else {
        buttonContent = "Write A Review";
        // businessContent = <div className="business-content"> Reviews Here </div>;
        businessContent = (
          <div className="business-content">

            <ReviewsIndex reviews={business.reviews} indexType="business"/>
          </div>
        );
      }
      var klass;
      var imageUrls = business.image_urls;
      for (var i = 0; i < 3 && i < imageUrls.length; i++) {
        klass = "business-thumb-image";
        if (this.state.hoveringId === i) {
          klass = "business-thumb-image hovering-thumb";
        }

        images.push(
          <li className="business-thumb" key={i}>
            <div className="group image-wrapper">
              <img className={klass} src={imageUrls[i].image_url} onMouseOver={this.setHoveringThumb(i)} onMouseLeave={this.resetHoveringThumb}/>
            </div>
          </li>
        );
      }

      if (images.length === 0) {
        images.push(
          <li className="business-thumb">
              <img
                className="business-thumb-image default-image"
                src={window.defaultBusinessPhoto}
                onClick={this.toggleModal}
              />
          </li>
        );
      }

      var position = {
        lat: business.lat, lng: business.lng
      };

      return (
        <div className="business">
          <div className="business-header">
            <h1 className="business-header-name">
              {business.name}
            </h1>
            <div className="business-header-button" onClick={this.toggleForm}>
              <i className="fa fa-star button-star"/>
              {buttonContent}
            </div>

            <div className="business-header-button-image" onClick={this.toggleModal}>
              <i className="fa fa-camera"></i>
              Add a Photo
            </div>
            <ImageModal
              modalIsOpen={this.state.modalIsOpen}
              closeModal={this.closeModal}
              submitForm={this.uploadImage}
            />
            <BusinessMap position={position}/>
            <ul className="business-thumbs group">
              {images}
            </ul>
          </div>
          {businessContent}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
});

module.exports = Business;
