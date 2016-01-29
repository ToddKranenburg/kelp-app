var React = require('react'),
  ApiUtil = require('../../util/api_util'),
  ReactRouter = require('react-router'),
  Link = ReactRouter.Link,
  ReviewStore = require('../../stores/review_store');

var ReviewsIndexItem = React.createClass({
  render: function () {
    var stars = [];
    var review = this.props.review;

    var business = review.business;
    for (var i = 0; i < review.rating; i++) {
      stars.push(<i className="fa fa-star" key={i}></i>);
    }
    var date = new Date(review.created_at);
    var businessLink = (
      <Link to={'/businesses/' + business.id}>{business.name}</Link>
    );
    return (
      <article className="reviews-index-item">
        <div className="review-info group">
          <h2 className="review-author">
            {review.author.username} reviewed {businessLink}.
          </h2>
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
