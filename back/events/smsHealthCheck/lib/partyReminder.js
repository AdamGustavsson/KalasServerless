'use strict';
const resolves = require('../../../api/lib/graphql/collections/parties/resolves');
const smsgateway = require('../../../api/lib/smsgateway');

module.exports = {
  remindAll(){
    console.log("We are now in party reminder");
    // smsgateway.sendSMS(
    //     '0704214260',
    //     'sending party reminder now!!'
    // );
    // resolves.getUnansweredInvites()
    // .then((invites) => console.log(JSON.stringify(invites)));
  }
}
