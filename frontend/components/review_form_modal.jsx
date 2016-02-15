var React = require('react');
var Modal = require('react-modal');
var ModalConstants = require('../constants/modal_constants'),
  ReviewForm = require('./reviews/review_form'),
  ThumbApiUtil = require('../util/thumb_api_util');

var ReviewFormModal = React.createClass({

  render: function () {
    if (this.props.modalIsOpen) {
      $('#root').addClass("blur");
    } else if (!this.props.otherModalIsOpen && $('#root').hasClass("blur")) {
      $('#root').removeClass("blur");
    }

    var customStyles = ModalConstants.customStyles;
    customStyles.content.padding = "0px";


    return (
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.closeModal}
          style={customStyles}>
          <div className="review-form-wrapper">
          <i className="fa fa-times" onClick={this.props.closeModal}></i>
          <ReviewForm
            submitForm={this.props.submitForm}
            business={this.props.business}
          />
          </div>
        </Modal>
    );
  }
});

module.exports = ReviewFormModal;
