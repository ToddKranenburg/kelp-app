var React = require('react');
var Modal = require('react-modal');

var ImageModal = React.createClass({
  render: function() {
    var customStyle = {
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
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.props.closeModal}
        style={customStyles} >
        Things to say!
      </Modal>
    );

  }
});

module.exports = ImageModal;
