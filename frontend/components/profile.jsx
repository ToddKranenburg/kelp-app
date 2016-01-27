var React = require('react'),
  ReviewStore = require('../stores/review_store'),
  ApiUtil = require('../util/api_util'),
  ReviewsIndex = require('./reviews_index.jsx');

var Profile = React.createClass({
  getInitialState: function () {
    return { reviews: ReviewStore.all() };
  },

  componentDidMount: function () {
    this.reviewStoreListener = ReviewStore.addListener(this.reviewsChanged);
    ApiUtil.fetchAllReviews();
  },

  reviewsChanged: function () {
    this.setState({reviews: ReviewStore.all()});
  },

  render: function(){
    if (this.state.reviews) {
      return (
        <ReviewsIndex reviews={this.state.reviews}/>
      );
    } else {
      return <div></div>;
    }
  }
});

module.exports = Profile;
