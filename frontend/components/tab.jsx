var React = require('react'),
  TabConstants = require('../constants/tab_constants');

var Tab = React.createClass({
  render: function() {
    var myReviewsKlass = this.myReviewsKlass || "tab";
    var allReviewsKlass = this.allReviewsKlass || "tab unselected";
    return (
      <div className="tab-bar group">
        <div className={myReviewsKlass} onClick={this.props.tabClickHandler(TabConstants.MY_REVIEWS).bind(this)}>
          My Reviews
        </div>
        <div className={allReviewsKlass} onClick={this.props.tabClickHandler(TabConstants.ALL_REVIEWS).bind(this)}>
          All Reviews
        </div>
        <div className="empty-tab">
        </div>
      </div>
    );
  }
});

module.exports = Tab;
