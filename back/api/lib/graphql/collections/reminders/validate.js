'use strict';

const Promise = require('bluebird');

let validate = {
  mobileNumber: (mobileNumber) => {
      return;
  },
  id: (id) => {
    return;
  },
  reminderDate: (reminderDate) => {
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
