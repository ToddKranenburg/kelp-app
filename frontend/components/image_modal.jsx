var React = require('react');
var Modal = require('react-modal');


var ImageModal = React.createClass({
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
    var customStyles = {
      overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)'
      },
      content: {
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        right: 'auto',
        bottom: 'auto',
        border: '1px solid #ccc',
        transform: 'translate(-50%, -50%)',
        background: '#fff',
        padding: '20px'
      }
    };

    //add a submit form prop
    return (
      <div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.closeModal}
          style={customStyles} >
          <form onSubmit={this.submitForm}>
            <input className="profile-picture-upload-button" type="file" onChange={this.changeFile}/>
            <div className="thumb">
              <img className="preview-image" src={this.state.imageUrl}/>
              <button>Upload image</button>
            </div>
          </form>
        </Modal>
      </div>
    );

  }
});

module.exports = ImageModal;
