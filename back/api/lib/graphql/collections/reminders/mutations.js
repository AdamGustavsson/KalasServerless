'use strict';

const GraphQLString = require('graphql').GraphQLString;
const GraphQLNonNull = require('graphql').GraphQLNonNull;

const ReminderType = require('./type');
const validate = require('./validate');
const resolves = require('./resolves');

module.exports = {
  createReminder: {
    type: ReminderType,
    description: 'Create Reminder',
    args: {
      mobileNumber: { type: new GraphQLNonNull(GraphQLString) },
      reminderDate:   {type: new GraphQLNonNull(GraphQLString)},
      locale: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve(source, args) {
      args.reminderStatus = 'CREATED';
      return validate(args).then(() => resolves.create(args));
    }
  }
}
