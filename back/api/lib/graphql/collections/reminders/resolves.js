'use strict';

const Promise = require('bluebird');
const uuid = require('uuid');
const bcryptjs = require('bcryptjs');
const db = require('../../../dynamodb');
const invoke = require('../../../invoke')
const _ = require('lodash');
const smsgateway = require('../../../smsgateway');
const partyResolve = require('../parties/resolves');
var I18n = require('react-i18nify').I18n;

const translationsObject = {
  en: {
    SMSMessage: {
      accepted: "%{guestName} has accepted the invite to the birthday party of %{birthdayChild}. http://%{url} Click above for full info",
      rejected: "%{guestName} has rejected the invite to the birthday party of %{birthdayChild}. http://%{url} Click above for full info",
      invited: "Party invite: %{guestName} has been invited to the birthday party of %{birthdayChild}. http://%{url} Please click the link to answer and get more info"
    }
  },
  sv: {
    SMSMessage: {
      accepted: "%{guestName} har tackat ja till %{birthdayChild}s kalas. http://%{url} Klicka ovan för hela listan av inbjudna och deras status",
      rejected: "%{guestName} har tackat nej till %{birthdayChild}s kalas. http://%{url} Klicka ovan för hela listan av inbjudna och deras status",
      invited: "Kalasinbjudan: %{guestName} har blivit inbjuden till %{birthdayChild}s kalas. http://%{url} Klicka på länken för mer information och för att tacka ja eller nej"
    }
  }
};

I18n.loadTranslations(translationsObject);

const stage = process.env.SERVERLESS_STAGE;
const region = process.env.SERVERLESS_REGION;
const projectName = process.env.SERVERLESS_PROJECT;
const reminderTable = projectName + '-reminders-' + stage;

const baseURL = (stage=='prod'?'kalas.io':stage + '.kalas.io.s3-website-'+ region + '.amazonaws.com')


module.exports = {
  create(reminder) {
    reminder.id = uuid.v1();

    return db('put', {
      TableName: reminderTable,
      Item: reminder
    })
    // return the reminder record
    .then(() => reminder);
  },

  getTodaysActiveReminders() {
    return db('scan', {
      TableName: reminderTable,
      FilterExpression: "reminderStatus = :statusValue",
      ExpressionAttributeValues: {':statusValue':'CREATED'},
      ProjectionExpression: "id,mobileNumber,locale,reminderStatus"
    }).then(reply => reply.Items);
  },

};
