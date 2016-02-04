var React = require('react'),
  BusinessIndexItem = require('./business_index_item');


var BusinessesIndex = React.createClass({
  render: function() {
    var businesses = [];
    this.props.businesses.results.forEach(function (business) {
      businesses.push(
        <BusinessIndexItem
          business={business}
          key={business.id}/>
      );
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
