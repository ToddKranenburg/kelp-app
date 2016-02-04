var React = require('react'),
  ReactRouter = require('react-router'),
  Link = ReactRouter.Link;

var BusinessIndexItem = React.createClass({
  stars: function (business) {
    var stars = [];

    var numFullStars = Math.floor(business.average_rating / 2);
    for (var j = 0; j < numFullStars; j++) {
      stars.push(<i className="fa fa-star" key={j}/>);
    }
    if (business.average_rating % 2) {
      stars.push(<i className="fa fa-star-half-o" key={numFullStars}/>);
    }

    return stars;
  },

  render: function () {
    var business = this.props.business;
    var stars = this.stars(business);
    var imageUrl = business.image_urls[0] || {image_url: window.defaultBusinessPhoto};
    imageUrl = imageUrl.image_url;
    var businessLink = (
      <div className="business-index-link">{this.props.number}. <Link className="business-index-link-name" to={'/businesses/' + business.id}>{business.name}</Link></div>
    );
    return (
      <div className="business-index-item">
        <img src={imageUrl} className="business-index-item-image"></img>
        <div className="business-index-item-info">
          {businessLink}
          <div className="business-index-item-stars">{stars}</div>
        </div>
      </div>
    );

  }
});

module.exports = BusinessIndexItem;
