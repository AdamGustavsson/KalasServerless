'use strict';

const Promise = require('bluebird');

let validate = {
  token: (token) => {
      return;
  },    
  id: (id) => {
    return;
  },
  mobileNumber: (number) => {
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
