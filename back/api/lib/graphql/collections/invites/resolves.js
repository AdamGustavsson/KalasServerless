'use strict';

const Promise = require('bluebird');
const uuid = require('uuid');
const bcryptjs = require('bcryptjs');
const db = require('../../../dynamodb');
const invoke = require('../../../invoke')
const _ = require('lodash');
const smsgateway = require('../../../smsgateway');
const partyResolve = require('../parties/resolves');

const stage = process.env.SERVERLESS_STAGE;
const region = process.env.SERVERLESS_REGION;
const projectName = process.env.SERVERLESS_PROJECT;
const invitesTable = projectName + '-invites-' + stage;

const baseURL = 'graphql-test-project.'+ stage + '.' + region + '.s3-website-'+ region + '.amazonaws.com'


function   getInviteText (invite) {
    return party.get(invite.partyId).then((party) => (invite.childName + ' has been invited to the birthday party of' + party.childName + '. Please click the following link to RSVP: '
    + baseURL + '/#/invites/' + invite.id + '/show'))

}
module.exports = {

  getInvitesForParty(partyId) {
    return db('scan', {
      TableName: invitesTable,
      FilterExpression: "partyId = :partyId",
      ExpressionAttributeValues: {':partyId':partyId},
      ProjectionExpression: "id,childName,mobileNumber,inviteStatus"
    }).then(reply => reply.Items);
  },

  create(invite) {
    invite.id = uuid.v1();
    delete invite.token;

    return db('put', {
      TableName: invitesTable,
      Item: invite
    })
        // send the SMS to the invited user
        .then(() => partyResolve.get(invite.partyId))
        .then(partyResponse => invite.childName + ' has been invited to the birthday party of ' + partyResponse.childName + '. Please click the following link to RSVP: http://'
        + baseURL + '/#/invites/' + invite.id + '/show')
        .then(inviteText => smsgateway.sendSMS(invite.mobileNumber,inviteText))
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
       'partyId'
      ]
    }).then(reply => reply.Item);
  },
  accept(inviteId) {
    console.log('accepting invite with id: ' + inviteId);
    return db('update', {
      TableName: invitesTable,
      Key:{'id':inviteId},
      UpdateExpression: 'set inviteStatus = :a',
      ExpressionAttributeValues: {':a': 'ACCEPTED'},
      ReturnValues:"ALL_NEW"
    }).then(reply => reply.Attributes);
  }
};
