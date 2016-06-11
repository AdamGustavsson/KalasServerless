'use strict';

const Promise = require('bluebird');
const uuid = require('uuid');
const bcryptjs = require('bcryptjs');
const db = require('../../../dynamodb');
const authenticate = require('../../../auth').authenticate;
const invoke = require('../../../invoke')
const _ = require('lodash');

const stage = process.env.SERVERLESS_STAGE;
const projectName = process.env.SERVERLESS_PROJECT;
const usersTable = projectName + '-users-' + stage;

module.exports = {
  create(user) {
    user.id = uuid.v1();
    user.permissions = ['PARENT_USER'];

    // generated salted hash with bcryptjs with 10 work factor
    user.password_hash = bcryptjs.hashSync(user.password, 10);

    delete user.password; // don't save plain password!

    return db('put', {
      TableName: usersTable,
      Item: user
    })
    // return the user record
    .then(() => user);
  },

  login(args) {
    const mobileNumber = args.mobileNumber;
    const password = args.password;

    return db('get', {
        TableName: usersTable,
        Key: {mobileNumber},
        AttributesToGet: [
          'id',
          'name',
          'mobileNumber',
          'permissions',
          'password_hash'
        ]
      })
      .then(reply => {
        const Item = reply.Item;
        if (!Item) return Promise.reject('User not found');

        let match = bcryptjs.compareSync(password, Item.password_hash);
        if (!match) return Promise.reject('invalid password');

        delete Item.password_hash;

        Item.token = authenticate(Item);

        return Item;
      });
  },

  get(mobileNumber) {
    return db('get', {
      TableName: usersTable,
      Key: {mobileNumber},
      AttributesToGet: [
        'id',
        'mobileNumber',
        'name'
      ]
    }).then(reply => reply.Item);
  },

  getAll() {
    return db('scan', {
      TableName: usersTable,
      AttributesToGet: [
        'id',
        'mobileNumber',
        'name'
      ]
    }).then(reply => reply.Items);
  },

  update(user, obj) {

    // update data
    user.mobileNumber = obj.mobileNumber || user.mobileNumber;
    user.name = obj.name || user.name;
    user.password_hash = bcryptjs.hashSync(obj.password, 10);

    return db('put', {
      TableName: usersTable,
      Item: user
    }).then(() => _.merge({}, user, obj));
  },

  remove(user) {
    return db('delete', {
      TableName: usersTable,
      Key: { mobileNumber: user.mobileNumber }
    });
  }
};
