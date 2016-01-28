var React = require('react'),
  ApiUtil = require('../util/api_util'),
  LinkedStateMixin = require('react-addons-linked-state-mixin'),
  ReviewStore = require('../stores/review_store');

var ReviewForm = React.createClass({
  mixins: [LinkedStateMixin],

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

  expandForm: function () {
    this.setState({formBodyKlass: "review-form-body expanded"});
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

    var buttonKlass = "review-form-button";
    if (this.state.rating > 0) {
      buttonKlass = "show-button";
    }

    return (
      <div className="review-form">
        {stars}
        <form onSubmit={this.submitForm}>
          <textarea
            className={this.state.formBodyKlass}
            placeholder="Write a new review..."
            onFocus={this.expandForm}
            valueLink={this.linkState("body")}
          />
        <button className={buttonKlass}>Post</button>
        </form>
      </div>
    );
  }
});

module.exports = ReviewForm;
