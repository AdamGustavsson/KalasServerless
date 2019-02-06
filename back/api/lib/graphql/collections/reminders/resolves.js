'use strict';

const Promise = require('bluebird');
const uuid = require('uuid');
const bcryptjs = require('bcryptjs');
const db = require('../../../dynamodb');
const invoke = require('../../../invoke')
const _ = require('lodash');

const stage = process.env.SERVERLESS_STAGE;
const region = process.env.SERVERLESS_REGION;
const projectName = process.env.SERVERLESS_PROJECT;
const reminderTable = projectName + '-reminders-' + stage;


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
    //TODO change to a query and add an index. This will fail when the size of the table is big enough
    return db('scan', {
      TableName: reminderTable,
      FilterExpression: "reminderStatus = :statusValue and reminderDate = :dateValue",
      ExpressionAttributeValues: {':statusValue':'CREATED',
                                  ':dateValue':new Date().toISOString().slice(0,10)},
      ProjectionExpression: "id,mobileNumber,locale,reminderStatus"
    }).then(reply => reply.Items);
  },
  setReminderAsDone(id) {
    return db('update', {
      TableName: reminderTable,
      Key:{'id':id},
      UpdateExpression: 'set reminderStatus = :s',
      ExpressionAttributeValues: {':s': 'DONE'},
      ReturnValues:"ALL_NEW"
    }).then(reply => reply.Attributes);
  },

};
