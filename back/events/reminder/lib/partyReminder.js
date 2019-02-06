'use strict';
//const resolves = require('../../../api/lib/graphql/collections/invites/resolves');

function getIntervalForTomorrow(){
  var today = new Date();
  var start = new Date();
  var end = new Date();
  start.setDate(today.getDate()+1);
  end.setDate(today.getDate()+2);
  start.setHours(0);
  start.setMinutes(0);
  start.setSeconds(0)
  start.setMilliseconds(0);
  end.setHours(0);
  end.setMinutes(0);
  end.setSeconds(0)
  end.setMilliseconds(0);
  return  [Math.round(start/1000),Math.round(end/1000)]
}

module.exports = {
  remindAll(){
    console.log("We are now in remind all");
    var [intervalStart,intervalEnd] = getIntervalForTomorrow();
    console.log(intervalStart);
    console.log(intervalEnd);
    resolves.getAcceptedInvitesForUpcomingParties(intervalStart,intervalEnd)
    .then((invites) => console.log(JSON.stringify(invites)));
  }
}
