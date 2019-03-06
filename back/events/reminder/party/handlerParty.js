'use strict';
const partyReminder = require('../lib/partyReminder');


module.exports.handler = (event, context, cb) => {
  console.log("reminder was tiggered");
  partyReminder.remindSameSecond();
};
