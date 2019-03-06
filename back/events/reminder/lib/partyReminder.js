'use strict';
const inviteResolves = require('../../../api/lib/graphql/collections/invites/resolves');
const partyResolves = require('../../../api/lib/graphql/collections/parties/resolves');
const smsgateway = require('../../../api/lib/smsgateway');
var I18n = require('react-i18nify').I18n;
const stage = process.env.SERVERLESS_STAGE;
const region = process.env.SERVERLESS_REGION;
const projectName = process.env.SERVERLESS_PROJECT;
const baseURL = (stage=='prod'?'kalas.io':stage + '.kalas.io.s3-website-'+ region + '.amazonaws.com');

const translationsObject = {
  en: {
    SMSMessage: {
      partyReminder: "Reminder: Tomorrow at %{startTime} is the birthday party of %{birthdayChild}. %{guestName} is invited. http://%{url} Click above for full info"
    }
  },
  sv: {
    SMSMessage: {
      partyReminder: "Påminnelse: Imorgon kl. %{startTime} har %{birthdayChild} kalas. %{guestName} är bjuden. http://%{url} Klicka ovan för detaljer"
    }
  }
};
I18n.loadTranslations(translationsObject);

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

function handleInvites(invites){
  console.log("in handleInvites");
  console.log(invites);
  invites.forEach(invite => {
    partyResolves.get(invite.partyId)
        .then(partyResponse => {
        I18n.setLocale(partyResponse.locale);
        return I18n.t("SMSMessage.partyReminder",{guestName: invite.childName, birthdayChild: partyResponse.childName.trim(),startTime: partyResponse.startDateTime.split(' ')[1], url:baseURL + '/i/' + invite.id})
      })
        .then(inviteText => smsgateway.sendSMS(invite.mobileNumber,inviteText))
  });
}
function filterInvites(min,invites){
  // return those whos last number equals the min
  console.log("in filter");
  console.log("min:"+min);
  console.log(invites);
  //converting createDateTimeUnix to a date and taking the second, compare that with the current minute
  // the scheduling must be set so that this is run exactly 60 times per day, on the minute 1,2,3,4.... 
  return invites.filter(invite => new Date(invite.createDateTimeUnix*1000).getSeconds()==min)
}

module.exports = {
  remindSameSecond(){
    console.log("We are now in remindSameSecond");
    var min = new Date().getMinutes();
    console.log(min);
    var intervalStart = getIntervalForTomorrow()[0];
    var intervalEnd = getIntervalForTomorrow()[1];
    console.log(intervalStart);
    console.log(intervalEnd);
    inviteResolves.getAcceptedInvitesForUpcomingParties(intervalStart,intervalEnd)
    .then((invites) => handleInvites(filterInvites(min,invites)));
  }
}
