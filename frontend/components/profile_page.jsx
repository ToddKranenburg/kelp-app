var React = require('react'),
  UsersApiUtil = require('../util/users_api_util'),
  ApiUtil = require('../util/api_util'),
  SchoolApiUtil = require('../util/school_api_util'),
  ImageModal = require('./image_form_modal'),
  ReactRouter = require('react-router'),
  Link = ReactRouter.Link,
  OtherUserStore = require('../stores/other_user_store'),
  SchoolStore = require('../stores/school_store'),
  CurrentUserSchoolStore = require('../stores/current_user_school_store'),
  School = require('./school'),
  CurrentUserStore = require('../stores/current_user_store');

var ProfilePage = React.createClass({
  getInitialState: function () {
    return {modalIsOpen: false};
  },

  componentDidMount: function () {
    if (this.props.isCurrentUser) {
      this.currentUserStoreListener = CurrentUserStore.addListener(this.forceUpdate.bind(this));
    } else {
      this.otherUserStoreListener = OtherUserStore.addListener(this.forceUpdate.bind(this));
      UsersApiUtil.fetchUserById(this.props.userId);
    }
    this.schoolStoreListener = SchoolStore.addListener(this.forceUpdate.bind(this));
    this.currentUserSchoolStoreListener = CurrentUserSchoolStore.addListener(this.currentUserSchoolChanged);
    SchoolApiUtil.fetchSchoolMembersByOwnerId(this.props.userId);
  },

  componentWillUnmount: function () {
    if (this.props.isCurrentUser) {
      this.currentUserStoreListener.remove();
    } else {
      this.otherUserStoreListener.remove();
    }

    this.schoolStoreListener.remove();
    this.currentUserSchoolStoreListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    SchoolApiUtil.fetchSchoolMembersByOwnerId(newProps.userId);
    if (!this.props.isCurrentUser) {
      UsersApiUtil.fetchUserById(this.props.userId);
    }
  },

  currentUserSchoolChanged: function () {
    this.forceUpdate();
  },

  uploadImage: function (e, imageFile) {
    e.preventDefault();
    var currentUserId = CurrentUserStore.getCurrentUser().id;
    var formData = new FormData();
    formData.append("profile_picture", imageFile);
    UsersApiUtil.updateCurrentUser(formData, currentUserId, function () {
      ApiUtil.fetchReviewsByUserId(currentUserId);
      return;
    });
    this.closeModal();
  },

  toggleModal: function () {
    this.setState({modalIsOpen: !this.state.modalIsOpen});
  },

  closeModal: function () {
    this.setState({modalIsOpen: false});
  },

  addSchoolMember: function () {
    var schoolMemberId = OtherUserStore.getOtherUser().id;
    SchoolApiUtil.createSchoolMembership(schoolMemberId, function () {
      SchoolApiUtil.fetchCurrentUserSchoolMembersById(CurrentUserStore.getCurrentUser().id);
    });
  },

  render: function() {
    var user, cog, modal, addNewBusinessButton, addSchoolMemberButton;
    if (this.props.isCurrentUser) {
      user = CurrentUserStore.getCurrentUser();
      cog =   <i className="fa fa-cog" onClick={this.toggleModal}></i>;
      modal = <ImageModal
        modalIsOpen={this.state.modalIsOpen}
        closeModal={this.closeModal}
        submitForm={this.uploadImage}
        />;
      addNewBusinessButton = <Link className="my-button" to='/business-form'>Add a New Business to Kelp</Link>;
    } else {
      user = OtherUserStore.getOtherUser();
      if (!CurrentUserSchoolStore.hasMember(user.id)) {
        addSchoolMemberButton = <button onClick={this.addSchoolMember} className="my-button">Add {user.username} to your school</button>;
      } 
    }

    var imageUrl = user.image_url;
    return (
      <div className="profile-info group">
        <img className="profile-picture" src={imageUrl}/>
        <h2 className="profile-username">{user.username}</h2>
        {cog}
        {modal}
        {addSchoolMemberButton}
        <School schoolMembers={SchoolStore.getSchoolMembers()} username={user.username}/>
        {addNewBusinessButton}
      </div>
    );
  }

});

module.exports = ProfilePage;
