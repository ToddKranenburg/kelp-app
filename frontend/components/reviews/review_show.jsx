var React = require('react'),
  ApiUtil = require('../../util/api_util'),
  ReviewStore = require('../../stores/review_store');

var Review = React.createClass({
  getInitialState: function () {
      return {review: null};
  },

  componentDidMount: function () {
    ReviewStore.addListener(this.reviewChanged);
    ApiUtil.fetchReviewById(this.props.params.id);
  },

  reviewChanged: function () {
    var reviewId = this.props.params.id;
    this.setState({review: ReviewStore.getReviewById(reviewId)});
  },

  render: function () {
    var review = this.state.review;
    //FLESH THIS OUT IF YOU WANT TO USE THIS COMPONENT
    if (review) {
      return (
        <div>More could go here! {review.body}</div>
      );
    } else {
      return <div>NOT HERE!</div>;
    }
  }
});

module.exports = Review;
