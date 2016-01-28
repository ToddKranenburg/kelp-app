var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var BusinessConstants = require('../constants/business_constants');
var BusinessStore = new Store(AppDispatcher);

var _businesses = {};

BusinessStore.all = function () {
  var keys = Object.keys(_businesses);
  var allBusinesss = [];

  for (var i = 0; i < keys.length; i++) {
    allBusinesss.push(_businesses[keys[i]]);
  }

  return allBusinesses;
};

BusinessStore.getBusinessById = function(businessId) {
  return _businesses[businessId];
};

BusinessStore.resetAllBusinesss = function (businesses) {
  _businesses = {};
  for (var i = 0; i < businesses.length; i++) {
    _businesses[businesses[i].id] = businesses[i];
  }
};
BusinessStore.resetSingleBusiness = function (business) {
  _businesses[business.id] = business;
};

BusinessStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case BusinessConstants.RECEIVE_ALL_BUSINESSES:
      BusinessStore.resetAllBusinesses(payload.businesses);
      BusinessStore.__emitChange();
      break;
    case BusinessConstants.RECEIVE_SINGLE_BUSINESS:
      BusinessStore.resetSingleBusiness(payload.business);
      BusinessStore.__emitChange();
      break;
  }
};

module.exports = BusinessStore;
