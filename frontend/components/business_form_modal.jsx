var React = require('react');
var Modal = require('react-modal');
var ModalConstants = require('../constants/modal_constants'),
  ThumbApiUtil = require('../util/thumb_api_util');

var BusinessFormModal = React.createClass({
  getInitialState: function () {
    return ({imageFile: null, imageUrl: ""});
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

  resetForm: function () {
    this.setState({imageFile: null, imageUrl: "", uploading: false});
  },

  submitForm: function (e) {
    e.preventDefault();
    this.props.submitForm(businessApiUtilCallback.bind(this));

    function businessApiUtilCallback (businessId) {
      var formData = new FormData();
      if (this.state.imageFile) {
        formData.append("image", this.state.imageFile);
        ThumbApiUtil.createThumb(formData, businessId, this.props.completeBusinessCreation(businessId));
      } else {
        this.props.completeBusinessCreation(businessId)();
      }
    }
  },

  closeModal: function () {
    this.resetForm();
    this.props.closeModal();
  },

  render: function () {
    if (this.props.modalIsOpen) {
      $('#root').addClass("blur");
    } else if ($('#root').hasClass("blur")) {
      $('#root').removeClass("blur");
    }

    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.closeModal}
        style={ModalConstants.customStyles}>
        <form className="image-upload-form" onSubmit={this.submitForm}>
          <div className="image-upload-input-button">Choose an image</div>
          <img className="preview-image" src={this.state.imageUrl}/>
          <input className="image-upload-input" type="file" onChange={this.changeFile}/>
          <button className="image-upload-button my-button" onClick={this.submitForm}>
            Add to Kelp
          </button>
        </form>
      </Modal>
    );
  }
});

module.exports = BusinessFormModal;