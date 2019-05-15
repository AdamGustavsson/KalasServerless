'use strict';
const MobileNumberValidation = require("../../../mobileNumberValidation");
const Promise = require('bluebird');

let validate = {
  hostUser: (hostUser) => {
    console.log("validating hostuser:" + hostUser)
    if(!MobileNumberValidation.isValidSwedishMobileNumber(hostUser)) {
      console.log("throwing error in hostuser validate")
      throw "Not a Swedish mobile number";
    } 
    return;
  },
  id: (id) => {
    return;
  },
  header: (header) => {
    return;
  },
  description: (description) => {
   return;
  },
  hostUser: (hostUser) => {
    return;
  },
  childName: (childName) => {
    return;
  },
  startDateTimeUnix: (startDateTimeUnix) => {
    return;
  },
  startDateTime: (startDateTime) => {
    return;
  },
  endDateTime: (endDateTime) => {
    return;
  },
  partyLocation: (partyLocation) => {
    return;
  },
  locale:(locale) => {
    return;
  },
  theme:(theme) => {
    return;
  },
  status:(status) => {
    return;
  },
  offerUrl:(offerUrl) => {
    return;
  }
};


module.exports = (data) => {
  Object.keys(data).forEach((d) => {validate[d](data[d])});
  return Promise.resolve();
}
