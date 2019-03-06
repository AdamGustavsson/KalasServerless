'use strict';

const Promise = require('bluebird');
const uuid = require('uuid');
const bcryptjs = require('bcryptjs');
const db = require('../../../dynamodb');
const invoke = require('../../../invoke')
const _ = require('lodash');
const smsgateway = require('../../../smsgateway');
const partyResolve = require('../parties/resolves');
const userResolve = require('../users/resolves');
var I18n = require('react-i18nify').I18n;

const translationsObject = require('../../translations/translations');

I18n.loadTranslations(translationsObject);

const stage = process.env.SERVERLESS_STAGE;
const region = process.env.SERVERLESS_REGION;
const projectName = process.env.SERVERLESS_PROJECT;
const invitesTable = projectName + '-invites-' + stage;
const partyIndex = 'partyId-index';
const timeIndex= 'inviteStatus-partyDateTimeUnix-index';

const baseURL = (stage=='prod'?'kalas.io':stage + '.kalas.io.s3-website-'+ region + '.amazonaws.com')


module.exports = {

  getInvitesForParty(partyId) {
    return db('query', {
      TableName: invitesTable,
      IndexName:partyIndex,
      KeyConditionExpression: "partyId = :partyId",
      ExpressionAttributeValues: {':partyId':partyId},
      ProjectionExpression: "id,childName,mobileNumber,inviteStatus"
    }).then(reply => reply.Items);
  },

  create(invite) {
    invite.id = uuid.v1();
    return partyResolve.get(invite.partyId)
    .then(partyResponse => {
      I18n.setLocale(partyResponse.locale);
      const inviteText = I18n.t("SMSMessage.invited",{guestName: invite.childName, birthdayChild: partyResponse.childName.trim(), url:baseURL + '/i/' + invite.id})
      smsgateway.sendSMS(invite.mobileNumber,inviteText);
      invite.createDateTimeUnix = Math.round(new Date().getTime()/1000);
      invite.partyDateTimeUnix = partyResponse.startDateTimeUnix;
      return Promise.resolve(invite);
    })
    .then( invite  => db('put', {
        TableName: invitesTable,
        Item: invite
      })
    )
    // finally return the invite record
    .then(() => invite);
  },
  get(id) {
    return db('get', {
      TableName: invitesTable,
      Key: {id},
      AttributesToGet: [
       'id',
       'childName',
       'inviteStatus',
       'partyId',
       'mobileNumber'
      ]
    }).then(reply => reply.Item);
  },
  getAcceptedInvitesForUpcomingParties(intervalStart,intervalEnd) {
    return db('query', {
      TableName: invitesTable,
      IndexName:timeIndex,
      KeyConditionExpression: "inviteStatus = :statusValue and partyDateTimeUnix BETWEEN :startValue and :endValue",
      ExpressionAttributeValues: {':statusValue':'ACCEPTED',':startValue': intervalStart,':endValue': intervalEnd},
      ProjectionExpression: "id,childName,mobileNumber,partyId,createDateTimeUnix"
    }).then(reply => reply.Items);
  },
  accept(inviteId) {
    console.log('accepting invite with id: ' + inviteId);
    var invite;
    var party;
    var messageToHost;
    var messageNeeded =true;
    return db('update', {
      TableName: invitesTable,
      Key:{'id':inviteId},
      UpdateExpression: 'set inviteStatus = :a',
      ExpressionAttributeValues: {':a': 'ACCEPTED'},
      ReturnValues:"ALL_OLD"
    }).then((reply) => {
      invite=reply.Attributes;
      if (invite.inviteStatus=='ACCEPTED'){
        // dont send message as the status is unchanged
        messageNeeded=false;
        return Promise.resolve()
      } else {
        invite.inviteStatus = 'ACCEPTED';
      }
      return partyResolve.get(invite.partyId)
    }).then(partyResponse =>{
      if(messageNeeded){
        party = partyResponse;
        I18n.setLocale(partyResponse.locale);
        messageToHost=   I18n.t('SMSMessage.accepted',{guestName: invite.childName, birthdayChild: party.childName.trim(), url: baseURL + '/p/' + party.id});
        return smsgateway.sendSMS(party.hostUser,messageToHost);
      } else {
        return Promise.resolve()
      }
    }).then(() => invite);
  },
  reject(inviteId) {
    I18n.setLocale('sv');
    console.log('rejecting invite with id: ' + inviteId);
    var invite;
    var party;
    var messageToHost;
    var messageNeeded = true;
    return db('update', {
      TableName: invitesTable,
      Key:{'id':inviteId},
      UpdateExpression: 'set inviteStatus = :a',
      ExpressionAttributeValues: {':a': 'REJECTED'},
      ReturnValues:"ALL_OLD"
    }).then((reply) => {
      invite=reply.Attributes;
      if (invite.inviteStatus=='REJECTED'){
        // dont send message as the status is unchanged
        messageNeeded=false;
        return Promise.resolve()
      } else {
        invite.inviteStatus = 'REJECTED';
      }
      return partyResolve.get(invite.partyId)
    }).then(partyResponse =>{
      if(messageNeeded){
        party = partyResponse;
        I18n.setLocale(partyResponse.locale);
        messageToHost= I18n.t('SMSMessage.rejected',{guestName: invite.childName, birthdayChild: party.childName.trim(), url: baseURL + '/p/' + party.id });
        return smsgateway.sendSMS(party.hostUser,messageToHost)
      } else {
        return Promise.resolve()
      }
    }).then(() => invite);
  }
};
