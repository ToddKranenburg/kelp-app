var React = require('react'),
  BusinessIndexItem = require('./business_index_item');


var BusinessesIndex = React.createClass({
  render: function() {
    var businesses = [];
    var businessIds = {};
    var all_results = this.props.businesses.business_results.concat(this.props.businesses.review_results);
    var i = 0;
    all_results.forEach(function (business) {
      if (businessIds[business.id]) {
        return;
      } else {
        i++;
      }
      businesses.push(
        <BusinessIndexItem
          business={business}
          number={i}
          key={business.id}/>
      );
      businessIds[business.id] = true;
    }.bind(this));

    if (businesses.length < 1) {
      businesses = <div>No businesses match your search.</div>;
    }

    return (
        <div className="businesses-index">
          {businesses}
        </div>
    );
  }
});

module.exports = BusinessesIndex;
