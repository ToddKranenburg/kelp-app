var React = require('react'),
  TabConstants = require('../constants/tab_constants');

var Tab = React.createClass({
  render: function() {
    var myReviewsKlass = this.myReviewsKlass || "tab";
    var allReviewsKlass = this.allReviewsKlass || "tab unselected";
    var schoolReviewsKlass = this.schoolReviewsKlass || "tab unselected";
    var tabs;
    if (this.props.isCurrentUser) {
      tabs =
        <div className="full-tabs">
          <div className={myReviewsKlass} onClick={this.props.tabClickHandler(TabConstants.MY_REVIEWS).bind(this)}>
            My Reviews
          </div>
          <div className={allReviewsKlass} onClick={this.props.tabClickHandler(TabConstants.ALL_REVIEWS).bind(this)}>
            All Reviews
          </div>
        </div>;
    } else {
      tabs =
        <div className="full-tabs">
          <div className={myReviewsKlass}>
            Reviews
          </div>
        </div>;
    }
    return (
      <div className="tab-bar group">
        {tabs}
        <div className="empty-tab">
        </div>
      </div>
    );
  }
});

module.exports = Tab;
