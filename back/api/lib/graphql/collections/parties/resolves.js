'use strict';

const Promise = require('bluebird');
const uuid = require('uuid');
const bcryptjs = require('bcryptjs');
const db = require('../../../dynamodb');
const MobileNumberValidation = require("../../../mobileNumberValidation");


const offerService = require('../offer/offerService');
const invoke = require('../../../invoke')
const _ = require('lodash');
const smsgateway = require('../../../smsgateway');
var I18n = require('react-i18nify').I18n;

const translationsObject =  require('../../translations/translations');

I18n.loadTranslations(translationsObject);

const stage = process.env.SERVERLESS_STAGE;
const region = process.env.SERVERLESS_REGION;
const projectName = process.env.SERVERLESS_PROJECT;
const partiesTable = projectName + '-parties-' + stage;
const userIndex = 'hostUser-index';
const baseURL = (stage=='prod'?'https://kalas.io':'http://' + stage + '.kalas.io.s3-website-'+ region + '.amazonaws.com');

module.exports = {
  create(party) {
    party.id = uuid.v1();
    party.hostUser = MobileNumberValidation.standardiseNumber(party.hostUser);
    party.childName = party.childName.replace(/\./g, " ");
    I18n.setLocale(party.locale);
    const linkText = I18n.t("SMSMessage.partyCreated",{birthdayChild: party.childName.trim(), url:baseURL + '/p/' + party.id}) + " " + offerService.getHostOfferText(party);
    smsgateway.sendSMS(party.hostUser,linkText);
    return db('put', {
      TableName: partiesTable,
      Item: party
    })
    // return the party record
    .then(() => party);
  },

  get(id) {
    return db('get', {
      TableName: partiesTable,
      Key: {id},
      AttributesToGet: [
       'id',
       'description',
       'header',
       'hostUser',
       'childName',
       'startDateTimeUnix',
       'startDateTime',
       'endDateTime',
       'partyLocation',
       'locale',
       'theme'
      ]
    }).then(function (reply){
              //Set as PASSED and send offerUrl if datetime is 1 hour after the start of the party 
              if (reply.Item.startDateTimeUnix+60*60<Date.now()/1000){
                reply.Item.status = 'PASSED';
                const offer = offerService.getOffer(reply.Item);
                if(offer){
                  reply.Item.offerUrl = offer.url;
                }
              }
               return reply.Item
    });
  },

  getAll() {
    return db('scan', {
      TableName: partiesTable,
      AttributesToGet: [
       'id',
       'description',
       'header',
       'hostUser',
       'childName',
       'startDateTime',
       'endDateTime',
       'partyLocation',
       'locale'
      ]
    }).then(reply => reply.Items);
  },

  getAllForUser(userId) {
    return db('query', {
      TableName: partiesTable,
      IndexName: userIndex,
      KeyConditionExpression: "hostUser = :userId",
      ExpressionAttributeValues: {':userId':userId},
      ProjectionExpression: "id,header,childName,startDateTime"
    }).then(reply => reply.Items);
  },

  update(oldParty, newFields) {
    var party = {};
    // update data
    party.id = oldParty.id;
    party.description = newFields.description || oldParty.description;
    party.header = newFields.header|| oldParty.header;
    party.hostUser = newFields.hostUser || oldParty.hostUser;
    party.childName = newFields.childName || oldParty.childName;
    party.startDateTimeUnix = newFields.startDateTimeUnix|| oldParty.startDateTimeUnix;
    party.startDateTime = newFields.startDateTime|| oldParty.startDateTime;
    party.endDateTime = newFields.endDateTime|| oldParty.endDateTime;
    party.partyLocation = newFields.partyLocation|| oldParty.partyLocation;
    party.locale = newFields.locale|| oldParty.locale;
    party.theme = newFields.theme|| oldParty.theme;


    return db('put', {
      TableName: partiesTable,
      Item: party
    }).then(() => party);
  },
  setThemeOnParty(id,theme) {
    return db('update', {
      TableName: partiesTable,
      Key:{'id':id},
      UpdateExpression: 'set theme = :t',
      ExpressionAttributeValues: {':t': theme},
      ReturnValues:"ALL_NEW"
    }).then(reply => reply.Attributes);
  },

  remove(id) {
    return db('delete', {
      TableName: partiesTable,
      Key: { id: id }
    });
  }
};
