var React = require('react');
var UsersApiUtil = require('../util/users_api_util');
var CurrentUserStore = require('../stores/current_user_store');

var ProfilePage = React.createClass({
  getInitialState: function () {
    return {imageFile: null, imageUrl: ""};
  },

  componentDidMount: function () {
    this.currentUserStoreListener = CurrentUserStore.addListener(this.forceUpdate.bind(this));
  },

  componentWillUnmount: function () {
    this.currentUserStoreListener.remove();
  },

  changeFile: function (e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function () {
      this.setState({imageFile: file, imageUrl: reader.result});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({imageFile: null, imageUrl: ""});
    }
  },

  uploadImage: function (e) {
    e.preventDefault();

    var formData = new FormData();

    formData.append("profile_picture", this.state.imageFile);
    var currentUserId = CurrentUserStore.getCurrentUser().id;
    UsersApiUtil.updateUser(formData, currentUserId, this.resetForm);
  },

  resetForm: function () {
    this.setState({imageFile: null, imageUrl: ""});
  },

  render: function() {
    var currentUser = CurrentUserStore.getCurrentUser();
    var imageUrl = currentUser.image_url;
    var thumb;
    if (this.state.imageFile) {
      thumb = (
        <div className="thumb">
          <img className="preview-image" src={this.state.imageUrl}/>
          <button>Change Profile Picture</button>
        </div>
      );
    }
    return (
      <div className="profile-info">
        <h2 className="profile-username">{currentUser.username}</h2>
        <img className="profile-picture" src={imageUrl}/>
        <form onSubmit={this.uploadImage}>
          <input className="profile-picture-upload-button" type="file" onChange={this.changeFile}/>
          {thumb}
        </form>
      </div>
    );
  }
});

module.exports = ProfilePage;
