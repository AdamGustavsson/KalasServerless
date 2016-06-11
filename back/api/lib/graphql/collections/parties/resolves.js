'use strict';

const Promise = require('bluebird');
const uuid = require('uuid');
const bcryptjs = require('bcryptjs');
const db = require('../../../dynamodb');
const invoke = require('../../../invoke')
const _ = require('lodash');

const stage = process.env.SERVERLESS_STAGE;
const projectName = process.env.SERVERLESS_PROJECT;
const partiesTable = projectName + '-parties-' + stage;

module.exports = {
  create(party) {
    party.id = uuid.v1();
    delete party.token;

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
       'startDateTime',
       'endDateTime',
       'partyLocation'
      ]
    }).then(reply => reply.Item);
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
       'partyLocation'
      ]
    }).then(reply => reply.Items);
  },

  getAllForUser(userId) {
    return db('scan', {
      TableName: partiesTable,
      FilterExpression: "hostUser = :userId",
      ExpressionAttributeValues: {':userId':userId},
      ProjectionExpression: "id,description,header,hostUser,childName,startDateTime,endDateTime,partyLocation"
    }).then(reply => reply.Items);
  },

  update(party, obj) {

    // update data
    party.id = obj.id || party.id;
    party.description = obj.description || party.description;
    party.header = obj.header|| party.header;
    party.hostUser = obj.hostUserhostUser || party.hostUser;
    party.childName = obj.childName || party.childName;
    party.startDateTime = obj.startDateTime|| party.startDateTime;
    party.endDateTime = obj.endDateTime|| party.endDateTime;
    party.partyLocation = obj.partyLocation|| party.partyLocation;


    return db('put', {
      TableName: partiesTable,
      Item: party
    }).then(() => _.merge({}, party, obj));
  },

  remove(id) {
    return db('delete', {
      TableName: partiesTable,
      Key: { id: id }
    });
  }
};
