'use strict';
const inviteReminder = require('./lib/inviteReminder');
// const serviceReminder = require('./lib/serviceReminder');
const smsSender = require('../../api/lib/smsgateway');


module.exports.handler = (event, context, cb) => {
  console.log("sms health check was triggered");

  // ming's number
  let mingMobile = '0046704214260';
  let message = 'SMS Gateway daily check OK';
  smsSender.sendSMS(
     mingMobile,
     message
  );
};
