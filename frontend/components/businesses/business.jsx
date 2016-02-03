var React = require('react'),
  ApiUtil = require('../../util/api_util'),
  ThumbApiUtil = require('../../util/thumb_api_util'),
  ReviewForm = require('../reviews/review_form'),
  ImageModal = require('../image_form_modal'),
  ReviewFormModal = require('../review_form_modal'),
  BusinessMap = require('../business_map'),
  ReviewsIndex = require('../reviews/reviews_index'),
  BusinessStore = require('../../stores/business_store'),
  Modal = require('react-modal'),
  ModalConstants = require('../../constants/modal_constants'),
  ReviewStore = require('../../stores/review_store');

var Business = React.createClass({
  getInitialState: function () {
      return ({
        business: null,
        showForm: false,
        hoveringId: -1,
        imageModalIsOpen: false,
        formModalIsOpen: false
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

  componentWillReceiveProps: function () {
    this.setState({
      business: null,
      showForm: false,
      hoveringId: -1,
      imageModalIsOpen: false,
      formModalIsOpen: false
    });
  },

  getBusiness: function () {
    ApiUtil.fetchBusinessById(this.props.params.id);
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

  toggleFormModal: function () {
    this.setState({formModalIsOpen: !this.state.formModalIsOpen});
  },

  toggleImageModal: function () {
    this.setState({imageModalIsOpen: !this.state.imageModalIsOpen});
  },

  setHoveringThumb: function (index) {
    return function () {
      this.setState({hoveringId: index});
    }.bind(this);
  },

  resetHoveringThumb: function () {
    this.setState({hoveringId: -1});
  },

  closeFormModal: function () {
    this.setState({formModalIsOpen: false});
  },

  closeImageModal: function () {
    this.setState({imageModalIsOpen: false});
  },

  uploadImage: function (e, imageFile) {
    e.preventDefault();

    var formData = new FormData();
    formData.append("image", imageFile);
    var businessId = this.state.business.id;
    var thumbsChanged = this.thumbsChanged;
    ThumbApiUtil.createThumb(formData, businessId, thumbsChanged);
    this.closeImageModal();
  },

  images: function (imageUrls) {
    var images = [];
    var klass;
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
        <li className="business-thumb" key={0}>
            <img
              className="business-thumb-image default-image"
              src={window.defaultBusinessPhoto}
              onClick={this.toggleModal}
            />
        </li>
      );
    }

    return images;
  },

  stars: function (business) {
    var stars = [];

    var numFullStars = Math.floor(business.average_rating / 2);
    for (var j = 0; j < numFullStars; j++) {
      stars.push(<i className="fa fa-star" key={j}/>);
    }
    if (business.average_rating % 2) {
      stars.push(<i className="fa fa-star-half-o" key={numFullStars}/>);
    }

    return stars;
  },

  render: function () {
    var business = this.state.business;
    if (!business) {
      this.getBusiness();
      return <div></div>;
    }

    var buttonContent = "Write A Review";
    var businessContent = (
      <div className="business-content">
        <ReviewsIndex reviews={business.reviews} indexType="business"/>
      </div>
    );

    var images = this.images(business.image_urls);

    var position = {
      lat: business.lat, lng: business.lng
    };

    var stars = this.stars(business);

    return (
      <div className="business">
        <div className="business-header">
          <nav className="business-header-nav">
            <h1 className="business-header-name">
              {business.name}
              <div className = "average-rating">
                {stars}
              </div>
            </h1>
            <div className="business-header-button-image" onClick={this.toggleImageModal}>
              <i className="fa fa-camera"></i>
              Add a Photo
            </div>
            <div className="business-header-button" onClick={this.toggleFormModal}>
              <i className="fa fa-star button-star"/>
              {buttonContent}
            </div>
          </nav>
          <BusinessMap position={position}/>
          <ul className="business-thumbs group">
            {images}
          </ul>
        </div>
        {businessContent}
        <ImageModal
          modalIsOpen={this.state.imageModalIsOpen}
          closeModal={this.closeImageModal}
          submitForm={this.uploadImage}
          otherModalIsOpen={this.state.formModalIsOpen}
        />
        <ReviewFormModal
          modalIsOpen={this.state.formModalIsOpen}
          closeModal={this.closeFormModal}
          business={business}
          submitForm={this.closeFormModal}
          otherModalIsOpen={this.state.imageModalIsOpen}
        />
      </div>
    );
  }
});

module.exports = Business;
