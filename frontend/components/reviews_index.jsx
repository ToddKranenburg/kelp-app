var React = require('react'),
  ApiUtil = require('../util/api_util'),
  ReviewStore = require('../stores/review_store');

var ReviewsIndex = React.createClass({
  render: function(){
    var reviews = [];
    this.props.reviews.forEach(function (review) {
      reviews.push( <div key={review.id}>{review.body}</div> );
    });
    return (
        <div>
          {reviews}
        </div>
    );
  }
});

module.exports = ReviewsIndex;
