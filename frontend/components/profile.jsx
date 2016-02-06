var React = require('react'),
  ReviewStore = require('../stores/review_store'),
  ReviewForm = require('../components/reviews/review_form'),
  CurrentUserStore = require('../stores/current_user_store'),
  ApiUtil = require('../util/api_util'),
  SchoolApiUtil = require('../util/school_api_util'),
  TabConstants = require('../constants/tab_constants'),
  Tab = require('../components/tab'),
  ProfilePage = require('../components/profile_page'),
  ReviewsIndex = require('./reviews/reviews_index.jsx');

var Profile = React.createClass({
  getInitialState: function () {
    return ({
      reviews: null
    });
  },

  componentDidMount: function () {
    this.reviewStoreListener =
      ReviewStore.addListener(this.reviewsChanged);
    SchoolApiUtil.fetchCurrentUserSchoolMembersById(CurrentUserStore.getCurrentUser().id);

  },

  getUser: function () {
    var userId;
    if (this.props.params.id) {
      userId = this.props.params.id;
      if (CurrentUserStore.getCurrentUser().id === parseInt(userId)) {
        this.isCurrentUser = true;
      } else {
        this.isCurrentUser = false;
      }
    } else {
      userId = CurrentUserStore.getCurrentUser().id;
      this.isCurrentUser = true;
    }
    this.userId = userId;

    ApiUtil.fetchReviewsByUserId(userId);
  },

  componentWillReceiveProps: function () {
    this.userId = null;
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
          this.schoolReviewsKlass = "tab unselected";
          ApiUtil.fetchReviewsByUserId(this.props.userId);
        };
      case TabConstants.ALL_REVIEWS:
        return function () {
          this.allReviewsKlass = "tab";
          this.myReviewsKlass = "tab unselected";
          this.schoolReviewsKlass = "tab unselected";
          ApiUtil.fetchAllReviews();
        };
      case TabConstants.SCHOOL_REVIEWS:
        return function () {
          this.allReviewsKlass = "tab unselected";
          this.myReviewsKlass = "tab unselected";
          this.schoolReviewsKlass = "tab";
          ApiUtil.fetchSchoolReviewsByOwnerId(CurrentUserStore.getCurrentUser().id);
        };
    }
  },

  render: function() {
    if (this.state.reviews && this.userId) {
      return (
        <div className="profile group">
          <div className="profile-reviews">
            <Tab tabClickHandler={this.tabClicked} userId={this.userId} isCurrentUser={this.isCurrentUser}/>
            <ReviewsIndex reviews={this.state.reviews} indexType="profile"/>
          </div>
          <ProfilePage isCurrentUser={this.isCurrentUser} userId={this.userId} />
        </div>
      );
    } else {
      this.getUser();
      return <div></div>;
    }
  }
});

module.exports = Profile;
