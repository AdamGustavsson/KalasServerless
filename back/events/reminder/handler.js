'use strict';
const inviteReminder = require('./lib/inviteReminder');
const serviceReminder = require('./lib/serviceReminder');


module.exports.handler = (event, context, cb) => {
  console.log("reminder was tiggered");
  inviteReminder.remindAll();
  serviceReminder.remindAll();
};
