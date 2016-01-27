var React = require('react'),
  ReviewStore = require('../stores/review_store'),
  UserStore = require('../stores/user_store'),
  ApiUtil = require('../util/api_util'),
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
    ApiUtil.fetchAllReviews();
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

  render: function(){
    if (this.state.reviews && this.state.user) {
      return (
        <div className="profile group">
          <ReviewsIndex reviews={this.state.reviews}/>
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
