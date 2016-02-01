var React = require('react'),
  ApiUtil = require('../../util/api_util'),
  ReviewsIndexItem = require('./reviews_index_item'),
  ReviewForm = require('./review_form'),
  ReviewStore = require('../../stores/review_store');

var ReviewsIndex = React.createClass({
  render: function() {
    var reviews = [];
    var indexType = this.props.indexType;
    this.props.reviews.forEach(function (review) {
      reviews.push(
        <ReviewsIndexItem
          review={review}
          key={review.id}
          indexType={indexType}/>
      );
    }.bind(this));

    if (reviews.length < 1) {
      reviews = <div>No reviews.</div>;
    }
    return (
        <div className="reviews-index">
          {reviews}
        </div>
    );
  }
});

module.exports = ReviewsIndex;
