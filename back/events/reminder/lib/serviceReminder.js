'use strict';
const resolves = require('../../../api/lib/graphql/collections/reminders/resolves');
const smsgateway = require('../../../api/lib/smsgateway');
const I18n = require('react-i18nify').I18n;
const stage = process.env.SERVERLESS_STAGE;
const region = process.env.SERVERLESS_REGION;
const projectName = process.env.SERVERLESS_PROJECT;
const baseURL = (stage=='prod'?'https://kalas.io':'http://' + stage + '.kalas.io.s3-website-'+ region + '.amazonaws.com');

const translationsObject = {
  en: {
    SMSMessage: {
      reminder: "Some time ago you asked us to remind you to use our free invitation service. %{url} We hope that you will have a fantastic party!"
    }
  },
  sv: {
    SMSMessage: {
      reminder: "För en tid sedan bad du oss påminna dig att använda vår kostnadfria inbjudningstjänst. %{url} Vi hoppas ni får ett fantastiskt kalas!"
    }
  }
};
I18n.loadTranslations(translationsObject);

module.exports = {
  remindAll(){
    resolves.getTodaysActiveReminders()
    .then((reminders) => {
      reminders.map((reminder) => {
        I18n.setLocale(reminder.locale);
        const message=   I18n.t('SMSMessage.reminder',{url: baseURL + '/rl'});
        smsgateway.sendSMS(reminder.mobileNumber,message);
        resolves.setReminderAsDone(reminder.id);
      })
    });
  }
}
