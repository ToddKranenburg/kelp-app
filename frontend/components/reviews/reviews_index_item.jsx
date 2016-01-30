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
      <Link className="business-link" to={'/businesses/' + business.id}>{business.name}</Link>
    );

    var bodyKlass;
    if (this.props.indexType === "business") {
      bodyKlass = "review-body business-review";
    } else {
      bodyKlass = "review-body profile-review";
    }

    return (
      <article className="reviews-index-item">
        <div className="review-content group">
          <img className="review-image" src={review.author.image_url}/>
          <div className="review-info">
            <div className="review-details group">
              <h2 className="review-author">
                {review.author.username} reviewed {businessLink}
              </h2>
              <h3 className="review-date">{date.toDateString()}</h3>
            </div>
            <div className="review-stars">
              {stars}
            </div>
            <p className={bodyKlass}>
              {review.body}
            </p>
          </div>
        </div>
      </article>
    );
  }
});

module.exports = ReviewsIndexItem;
