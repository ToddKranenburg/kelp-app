var React = require('react'),
  ApiUtil = require('../util/api_util'),
  ReviewStore = require('../stores/review_store');

var ReviewsIndexItem = React.createClass({
  render: function () {
    var stars = [];
    var review = this.props.review;
    for (var i = 0; i < review.rating; i++) {
      stars.push(<i className="fa fa-star" key={i}></i>);
    }
    var date = new Date(review.date);

    return (
      <article className="reviews-index-item">
        <div className="review-info group">
          <h2 className="review-author">{review.author.username} reviewed someplace.</h2>
          <h3 className="review-date">{date.toDateString()}</h3>
        </div>
        <div className="review-stars">
          {stars}
        </div>
        <p className="review-body">
          {review.body}
        </p>
      </article>
    );
  }
});

module.exports = ReviewsIndexItem;
