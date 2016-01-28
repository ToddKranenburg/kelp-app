var AppDispatcher = require('../dispatcher/dispatcher'),
  BusinessConstants = require('../constants/business_constants');

var BusinessActions = {
  receiveSingleBusiness: function (business) {
    var payload = {
      actionType: BusinessConstants.RECEIVE_SINGLE_BUSINESS,
      business: business
    };
    AppDispatcher.dispatch(payload);
  }
};

module.exports = BusinessActions;
