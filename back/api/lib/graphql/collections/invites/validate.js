'use strict';
const MobileNumberValidation = require("../../../mobileNumberValidation");
const Promise = require('bluebird');

let validate = {
  token: (token) => {
      return;
  },    
  id: (id) => {
    return;
  },
  inviteId: (inviteId) => {
    return;
  },
  mobileNumber: (number) => {
    console.log("validating mobileNumber:" + number)
    if(!MobileNumberValidation.isValidSwedishMobileNumber(number)) {
      console.log("throwing error in mobileNumber validate")
      throw "Not a Swedish mobile number";
    } 
    return;
  },
  childName: (childName) => {
    return;
  },
  partyId: (id) => {
    return;
  }
};

module.exports = (data) => {
  Object.keys(data).forEach((d) => {validate[d](data[d])});
  return Promise.resolve();
}
