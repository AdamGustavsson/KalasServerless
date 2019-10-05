'use strict';
const MobileNumberValidation = require("../../../mobileNumberValidation");
const Promise = require('bluebird');

let validate = {
  mobileNumber: (number) => {
    console.log("validating mobileNumber:" + number)
    if(!MobileNumberValidation.isValidSwedishMobileNumber(number)) {
      console.log("throwing error in mobileNumber validate")
      throw "Not a Swedish mobile number";
    } 
    return;
  },
  id: (id) => {
    return;
  },
  reminderDate: (reminderDate) => {
    return;
  },
  reminderStatus: (reminderStatus) => {
    return;
  },
  locale:(locale) => {
    return;
  }
};


module.exports = (data) => {
  Object.keys(data).forEach((d) => {validate[d](data[d])});
  return Promise.resolve();
}
