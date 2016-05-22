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
};