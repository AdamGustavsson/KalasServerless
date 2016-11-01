'use strict';
const inviteReminder = require('./lib/inviteReminder');


module.exports.handler = (event, context, cb) => {
  console.log("reminder was tiggered");
  inviteReminder.remindAll();
};
