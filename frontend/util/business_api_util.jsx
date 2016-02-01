var BusinessActions = require('../actions/business_actions');

var BusinessApiUtil = {
  createBusiness: function (businessParams, success) {
    $.ajax({
      url: "/api/businesses",
      method: "POST",
      dataType: 'json',
      data: businessParams,
      success: function (business) {
        BusinessActions.receiveSingleBusiness(business);
        success(business.id);
      },
      error: function (data) {
        console.log('oh noooo! from createBusiness');
      }
    });
  }
};

module.exports = BusinessApiUtil;
