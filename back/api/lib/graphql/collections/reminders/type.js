'use strict';

const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLString = require('graphql').GraphQLString;

module.exports = new GraphQLObjectType({
  name: 'Reminder',
  description: 'Reminder',
  fields: () => ({
    id: {type: GraphQLString},
    mobileNumber: {type: GraphQLString},
    reminderDate:   {type: GraphQLString},
    locale: {type: GraphQLString}
  })
});
