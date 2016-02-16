var React = require('react'),
  ReviewStore = require('../stores/review_store'),
  ReviewForm = require('../components/reviews/review_form'),
  CurrentUserStore = require('../stores/current_user_store'),
  ApiUtil = require('../util/api_util'),
  SchoolApiUtil = require('../util/school_api_util'),
  TabConstants = require('../constants/tab_constants'),
  Shepherd = require('tether-shepherd'),
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
    if (!window.toured) {
      var defaults = {classes: 'shepherd-theme-arrows', scrollTo: false};
      tour = new Shepherd.Tour(
        {defaults: defaults}
      )

      tour.addStep('step-1',
        {title: 'Welcome to Kelp!',
        text: 'Kelp allows users to review their favorite aquatic businesses and much more.',
        attachTo: '.header-logo bottom-right',
        buttons: [{
          text: 'Next',
          action: tour.next
        }]}
      );
      tour.addStep('step-2',
        {title: 'Profile',
        text: 'This is your personal profile page. You can update your profile picture or check out the profiles of users in your "school", or personal network.',
        attachTo: '.profile-picture left',
        buttons: [{
          text: 'Next',
          action: tour.next
        }]}
      );
      tour.addStep('step-3',
        {title: 'Reviews',
        text: 'You can check out your reviews, recent reviews from across Kelp, or reviews by members of your "school".',
        attachTo: '.tab bottom',
        buttons: [{
          text: 'Next',
          action: tour.next
        }]}
      );
      tour.addStep('step-4',
        {title: 'Search',
        text: 'To find a business or a user on Kelp, use the search bar.',
        attachTo: '.search-bar-input bottom',
        buttons: [{
          text: 'Next',
          action: tour.next
        }]}
      );
      tour.addStep('step-5',
        {title: 'Add a Business',
        text: 'If there\'s a business you know of that is missing from the site, you can add it here.',
        attachTo: '.profile-info > .my-button bottom',
        buttons: [{
          text: 'Next',
          action: tour.next
        }]}
      );

      tour.addStep('step-6',
        {title: 'Enjoy',
        text: 'Now go on and get reviewing!',
        attachTo: '.profile-info > .my-button bottom-left',
        buttons: [{
          text: 'Exit',
          action: tour.hide
        }]}
      );

      tour.start()
      window.toured = true;
    }
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
        var that = this;
        return function () {
          this.allReviewsKlass = "tab unselected";
          this.myReviewsKlass = "tab unselected";
          this.schoolReviewsKlass = "tab";
          ApiUtil.fetchSchoolReviewsByOwnerId(that.userId);
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
