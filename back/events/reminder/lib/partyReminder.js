'use strict';
const inviteResolves = require('../../../api/lib/graphql/collections/invites/resolves');
const partyResolves = require('../../../api/lib/graphql/collections/party/resolves');
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
      partyReminder: "Påminnelse: Imorgon kl. %{startTime} är %{birthdayChild}s kalas. %{guestName} är bjuden. http://%{url} Klicka ovan för detaljer"
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
  invites.forEach(invite => {
    partyResolve.get(invite.partyId)
        .then(partyResponse => {
        I18n.setLocale(partyResponse.locale);
        return I18n.t("SMSMessage.partyReminder",{guestName: invite.childName, birthdayChild: partyResponse.childName.trim(),startTime: partyResponse.startDateTime.split(' ')[1], url:baseURL + '/i/' + invite.id})
      })
        .then(inviteText => smsgateway.sendSMS(invite.mobileNumber,inviteText))
  });
}

module.exports = {
  remindAll(){
    console.log("We are now in remind all");
    var [intervalStart,intervalEnd] = getIntervalForTomorrow();
    console.log(intervalStart);
    console.log(intervalEnd);
    inviteResolves.getAcceptedInvitesForUpcomingParties(intervalStart,intervalEnd)
    .then((invites) => handleInvites(invites));
  }
}
