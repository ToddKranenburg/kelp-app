var React = require('react'),
  UsersApiUtil = require('../util/users_api_util'),
  ApiUtil = require('../util/api_util'),
  ImageModal = require('./image_modal'),
  ReactRouter = require('react-router'),
  Link = ReactRouter.Link,
  CurrentUserStore = require('../stores/current_user_store');

var ProfilePage = React.createClass({
  getInitialState: function () {
    return {modalIsOpen: false};
  },

  componentDidMount: function () {
    this.currentUserStoreListener = CurrentUserStore.addListener(this.forceUpdate.bind(this));
  },

  componentWillUnmount: function () {
    this.currentUserStoreListener.remove();
  },

  uploadImage: function (e, imageFile) {
    e.preventDefault();

    var formData = new FormData();
    formData.append("profile_picture", imageFile);
    var currentUserId = CurrentUserStore.getCurrentUser().id;
    UsersApiUtil.updateUser(formData, currentUserId, function () {
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

  render: function() {
    var currentUser = CurrentUserStore.getCurrentUser();
    var imageUrl = currentUser.image_url;

    return (
      <div className="profile-info group">
        <img className="profile-picture" src={imageUrl}/>
        <h2 className="profile-username">{currentUser.username}</h2>
        <i className="fa fa-cog" onClick={this.toggleModal}></i>
        <ImageModal
          modalIsOpen={this.state.modalIsOpen}
          closeModal={this.closeModal}
          submitForm={this.uploadImage}
        />
        <Link className="my-button" to='/business-form'>Add a New Business to Kelp</Link>
      </div>
    );
  }

});

module.exports = ProfilePage;
