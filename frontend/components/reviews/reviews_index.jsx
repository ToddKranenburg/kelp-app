var React = require('react'),
  ApiUtil = require('../../util/api_util'),
  ReviewsIndexItem = require('./reviews_index_item'),
  ReviewForm = require('./review_form'),
  ReviewStore = require('../../stores/review_store');

var ReviewsIndex = React.createClass({
  render: function(){
    var reviews = [];
    this.props.reviews.forEach(function (review) {
      reviews.push( <ReviewsIndexItem review={review} key={review.id}/> );
    });
    return (
        <div className="reviews-index">
          {reviews}
        </div>
    );
  }
});

module.exports = ReviewsIndex;
