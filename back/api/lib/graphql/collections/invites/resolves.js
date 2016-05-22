'use strict';

const Promise = require('bluebird');
const uuid = require('uuid');
const bcryptjs = require('bcryptjs');
const db = require('../../../dynamodb');
const invoke = require('../../../invoke')
const _ = require('lodash');

const stage = process.env.SERVERLESS_STAGE;
const projectName = process.env.SERVERLESS_PROJECT;
const invitesTable = projectName + '-invites-' + stage;

module.exports = {
   
  getInvitesForParty(partyId) {
    return db('scan', {
      TableName: invitesTable,
      FilterExpression: "partyId = :partyId",
      ExpressionAttributeValues: {':partyId':partyId},
      ProjectionExpression: "id,childName,mobileNumber"
    }).then(reply => reply.Items);
  },

  create(invite) {
    invite.id = uuid.v1();
    delete invite.token;

    return db('put', {
      TableName: invitesTable,
      Item: invite
    })
    // let's invoke another lambda asynchronously (don't wait till it finished)!
        .then(() => invoke('timeout', {invite, delay: 70}))  // no actual delay here
        // if we pass a callback it will run synchronously, so we'll get a response
        .then(() => invoke('timeout', {invite, delay: 50}, (response) => {
          // this should be delayed for 50ms
          // let's do something with the response
          if (response.result === 'success') {
            console.log("response data:", response);
          } else {
            return Promise.reject(new Error("Something went wrong :("));
          }
        }))
        // finally return the invite record
        .then(() => invite);
  },
};