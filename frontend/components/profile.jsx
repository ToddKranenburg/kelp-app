var React = require('react'),
  ReviewStore = require('../stores/review_store'),
  ReviewForm = require('../components/reviews/review_form'),
  CurrentUserStore = require('../stores/current_user_store'),
  ApiUtil = require('../util/api_util'),
  TabConstants = require('../constants/tab_constants'),
  Tab = require('../components/tab'),
  ProfilePage = require('../components/profile_page'),
  ReviewsIndex = require('./reviews/reviews_index.jsx');

var Profile = React.createClass({
  getInitialState: function () {
    return ({
      reviews: null,
      user: CurrentUserStore.getCurrentUser()
    });
  },

  componentDidMount: function () {
    this.reviewStoreListener =
      ReviewStore.addListener(this.reviewsChanged);

    ApiUtil.fetchReviewsByUserId(this.state.user.id);
  },

  componentWillUnmount: function () {
    this.reviewStoreListener.remove();
  },

  reviewsChanged: function () {
    this.setState({reviews: ReviewStore.all()});
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

  uploadImage: function (e) {
    e.preventDefault();

  },

  render: function(){
    if (this.state.reviews && this.state.user) {
      return (
        <div className="profile group">
          <div className="profile-reviews">
            <Tab tabClickHandler={this.tabClicked} userId={this.state.user.id}/>
            <ReviewsIndex reviews={this.state.reviews} indexType="profile"/>
          </div>
          <ProfilePage/>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
});

module.exports = Profile;
