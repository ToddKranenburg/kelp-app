var ModalConstants = {
  customStyles: {
    overlay : {
      position          : 'fixed',
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : 'rgba(255, 255, 255, 0.1)'
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
  }
};

module.exports = ModalConstants;
