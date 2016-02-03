var React = require('react'),
  ApiUtil = require('../../util/api_util'),
  LinkedStateMixin = require('react-addons-linked-state-mixin'),
  History = require('react-router').History,
  ReviewStore = require('../../stores/review_store');

var ReviewForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
      return ({
        body: "",
        rating: 0,
        hoverRating: null,
        selectedBusinessId: null,
        formBodyKlass: "review-form-body"
      });
  },

  submitForm: function () {
    if (this.props.submitForm) {
      this.props.submitForm();
    }
    var businessId;
    var business = this.props.business;

    if (business) {
      businessId = business.id;
    } else {
      businessId = this.state.selectedBusinessId;
    }

    var reviewParams = {
      review: {
        body: this.state.body,
        rating: this.state.rating,
        business_id: businessId
      }
    };

    ApiUtil.createReview(reviewParams);
    //
    // history.pushState(null, 'businesses/' + businessId);
    this.setState({
      body: "",
      rating: 0,
      hoverRating: null,
      formBodyKlass: "review-form-body"
    });
  },

  handleStarClick: function (starIndex) {
    return (function () {
      this.setState({rating: starIndex + 1});
    }.bind(this));
  },

  handleStarHover: function (starIndex) {
    var prevRating = this.state.rating;
    return (function () {
      this.setState({hoverRating: starIndex + 1});
    }.bind(this));
  },

  handleStarUnhover: function (starIndex) {
    this.setState({hoverRating: null});
  },

  render: function () {
    var stars = [];
    var starKlass;
    for (var i = 0; i < 5; i++) {
      if (i >= (this.state.hoverRating || this.state.rating)) {
        starKlass = "fa fa-star-o";
      } else {
        starKlass = "fa fa-star";
      }
      stars.push(
        <i
          className={starKlass}
          key={i}
          onClick={this.handleStarClick(i)}
          onMouseOver={this.handleStarHover(i)}
          onMouseLeave={this.handleStarUnhover}>
        </i>
      );
    }

    var buttonKlass = "review-form-button my-button";
    if (this.state.rating > 0) {
      buttonKlass = "show-button my-button";
    }

    return (
      <div className="review-form">
        <h2 className="review-form-header">
          <div className="review-form-header-name">
            {this.props.business.name}
          </div>
          <div className="review-form-stars">
            {stars}
          </div>
        </h2>
        <div className="review-form-content">
          <form onSubmit={this.submitForm}>
            <textarea
              className="review-form-body"
              placeholder={"Write a new review for " + this.props.business.name + "..."}
              valueLink={this.linkState("body")}
              />
            <button className="my-button">Post</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = ReviewForm;
