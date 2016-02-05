var React = require('react');
var Modal = require('react-modal');
var ModalConstants = require('../constants/modal_constants'),
  Dropzone = require('react-dropzone');


var ImageFormModal = React.createClass({
  getInitialState: function () {
    return ({imageFile: null, imageUrl: ""});
  },

  dragAndDrop: function (files) {
    var reader = new FileReader();
    var file = files[0];

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
    var droppableKlass = "droppable";

    if (this.state.imageFile) {
      imageUploadButton = <button className="image-upload-button my-button">Upload image</button>;
      droppableKlass = "droppable filled_in";
    }

    //add a submit form prop
    return (
      <div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.closeModal}
          style={ModalConstants.customStyles} >
          <form className="image-upload-form" onSubmit={this.submitForm}>
            <i className="fa fa-times" onClick={this.props.closeModal}></i>
            <div className={droppableKlass}>
              <Dropzone onDrop={this.dragAndDrop} multiple={false}>
                <h3 className="droppable-words">Drag and drop or click here to add a photo</h3>
                <img className="preview-image" src={this.state.imageUrl}/>
              </Dropzone>
            </div>
            {imageUploadButton}
          </form>
        </Modal>
      </div>
    );

  }
});

module.exports = ImageFormModal;
