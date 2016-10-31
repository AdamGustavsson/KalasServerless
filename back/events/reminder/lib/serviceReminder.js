'use strict';
const resolves = require('../../../api/lib/graphql/collections/reminders/resolves');

module.exports = {
  remindAll(){
    console.log("We are now in remind all of serviceReminder");
    resolves.getTodaysActiveReminders();
    .then((reminders) => console.log(JSON.stringify(reminders)));
  }
}
