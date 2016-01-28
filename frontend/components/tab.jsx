var React = require('react'),
  TabConstants = require('../constants/tab_constants');

var Tab = React.createClass({
  render: function() {
    return (
      <div className="tab-bar group">
        <div className="tab" onClick={this.props.tabClickHandler(TabConstants.MY_REVIEWS)}>
          My Reviews
        </div>
        <div className="tab" onClick={this.props.tabClickHandler(TabConstants.ALL_REVIEWS)}>
          All Reviews
        </div>
      </div>
    );
  }
});

module.exports = Tab;
