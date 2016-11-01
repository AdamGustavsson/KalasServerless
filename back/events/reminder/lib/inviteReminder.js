'use strict';
const resolves = require('../../../api/lib/graphql/collections/invites/resolves');

module.exports = {
  remindAll(){
    console.log("We are now in remind all");
    resolves.getUnansweredInvites()
    .then((invites) => console.log(JSON.stringify(invites)));
  }
}
