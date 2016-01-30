var React = require('react');
var UsersApiUtil = require('../util/users_api_util');
var CurrentUserStore = require('../stores/current_user_store');

var ProfilePage = React.createClass({
  getInitialState: function () {
    return {imageFile: null, imageUrl: "", uploading: false};
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

  toggleUploading: function () {
    this.setState({uploading: !this.state.uploading});
  },

  resetForm: function () {
    this.setState({imageFile: null, imageUrl: "", uploading: false});
  },

  render: function() {
    var currentUser = CurrentUserStore.getCurrentUser();
    var imageUrl = currentUser.image_url;
    var imageUpdate;
    if (this.state.uploading) {
      imageUpdate = (
        <form onSubmit={this.uploadImage}>
          <input className="profile-picture-upload-button" type="file" onChange={this.changeFile}/>
          <div className="thumb">
            <img className="preview-image" src={this.state.imageUrl}/>
            <button>Change Profile Picture</button>
          </div>
        </form>
      );
    }
    return (
      <div className="profile-info group">
        <img className="profile-picture" src={imageUrl}/>
        <h2 className="profile-username">{currentUser.username}</h2>
        <i className="fa fa-cog" onClick={this.toggleUploading}></i>
        {imageUpdate}
      </div>
    );
  }
});

module.exports = ProfilePage;
