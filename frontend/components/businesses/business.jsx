var React = require('react'),
  ApiUtil = require('../../util/api_util'),
  ReviewForm = require('../reviews/review_form'),
  ReviewsIndex = require('../reviews/reviews_index'),
  BusinessStore = require('../../stores/business_store'),
  ReviewStore = require('../../stores/review_store');

var Business = React.createClass({
  getInitialState: function () {
      return ({
        business: null,
        showForm: false,
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

  toggleForm: function () {
    var showForm = this.state.showForm;
    this.setState({showForm: !showForm});
  },

  render: function () {
    var business = this.state.business;
    if (business) {
      var buttonContent;
      var businessContent;

      if (this.state.showForm) {
        buttonContent = "Show Reviews";
        businessContent = (
          <div className="business-content business-review-form">
            <ReviewForm business={business}/>
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

      return (
        <div className="business">
          <div className="business-header">
            <h1 className="business-header-name">
              {business.name}
            </h1>
            <div className="business-header-button" onClick={this.toggleForm}>
              {buttonContent}
            </div>
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
