var React = require('react'),
  ReviewStore = require('../stores/review_store'),
  ReviewForm = require('../components/review_form'),
  UserStore = require('../stores/user_store'),
  ApiUtil = require('../util/api_util'),
  TabConstants = require('../constants/tab_constants'),
  Tab = require('../components/tab'),
  ReviewsIndex = require('./reviews_index.jsx');

var Profile = React.createClass({
  getInitialState: function () {
    return ({
      reviews: null,
      user: null
    });
  },

  componentDidMount: function () {
    this.reviewStoreListener = ReviewStore.addListener(this.reviewsChanged);
    this.userStoreListener = UserStore.addListener(this.userChanged);
    ApiUtil.fetchReviewsByUserId(this.props.userId);
    ApiUtil.fetchUserById(this.props.userId);
  },

  componentWillUnmount: function () {
    this.reviewStoreListener.remove();
    this.userStoreListener.remove();
  },

  reviewsChanged: function () {
    this.setState({reviews: ReviewStore.all()});
  },

  userChanged: function () {
    this.setState({user: UserStore.getUser()});
  },

  tabClicked: function (tabConstant) {
    switch(tabConstant) {
      case TabConstants.MY_REVIEWS:
        return function () {
          this.myReviewsKlass = "tab";
          this.allReviewsKlass = "tab unselected";
          ApiUtil.fetchReviewsByUserId(this.props.userId);
        };
      case TabConstants.ALL_REVIEWS:
        return function () {
          this.allReviewsKlass = "tab";
          this.myReviewsKlass = "tab unselected";
          ApiUtil.fetchAllReviews();
        };
    }
  },

  render: function(){
    if (this.state.reviews && this.state.user) {
      return (
        <div className="profile group">
          <div className="profile-reviews">
            <ReviewForm/>
            <Tab tabClickHandler={this.tabClicked} userId={this.props.userId}/>
            <ReviewsIndex reviews={this.state.reviews}/>
          </div>
          <div className="profile-info">
            {this.state.user.username}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
});

module.exports = Profile;
