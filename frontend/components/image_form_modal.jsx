var React = require('react');
var Modal = require('react-modal');
var ModalConstants = require('../constants/modal_constants');


var ImageFormModal = React.createClass({
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
    this.props.submitForm(e, this.state.imageFile);
    this.resetForm();
  },

  render: function() {
    if (this.props.modalIsOpen) {
      $('#root').addClass("blur");
    } else if (!this.props.otherModalIsOpen && $('#root').hasClass("blur")) {
      $('#root').removeClass("blur");
    }

    var imageUploadButton;
    if (this.state.imageFile) {
      imageUploadButton = <button className="image-upload-button my-button">Upload image</button>;
    }

    //add a submit form prop
    return (
      <div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.closeModal}
          style={ModalConstants.customStyles} >
          <form className="image-upload-form" onSubmit={this.submitForm}>
            <div className="image-upload-input-button">Choose an image</div>
            <img className="preview-image" src={this.state.imageUrl}/>
            <input className="image-upload-input" type="file" onChange={this.changeFile}/>
            {imageUploadButton}
          </form>
        </Modal>
      </div>
    );

  }
});

module.exports = ImageFormModal;
