'use strict';

const Promise = require('bluebird');

let validate = {
  mobileNumber: (mobileNumber) => {
    let re = /^[0-9]{3,16}$/;
    if (!re.test(mobileNumber)) return Promise.reject('invalid mobileNumber');
  },
  password: (password) => {
    let re = /[a-zA-Z]\w{3,14}$/;
    if (!re.test(password)) return Promise.reject('invalid password');
  },
  name: (name) => {
    return;
  },
  token: (token) => {
    return;
  }
};


module.exports = (data) => {
  Object.keys(data).forEach((d) => {validate[d](data[d])});
  return Promise.resolve();
}
