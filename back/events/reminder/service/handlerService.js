'use strict';
const serviceReminder = require('../lib/serviceReminder');


module.exports.handler = (event, context, cb) => {
  console.log("reminder was tiggered");
  serviceReminder.remindAll();
};
