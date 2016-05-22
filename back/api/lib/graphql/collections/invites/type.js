'use strict';

const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLString = require('graphql').GraphQLString;

module.exports = new GraphQLObjectType({
  name: 'Invite',
  description: 'Invite',
  fields: () => ({
    id: {type: GraphQLString},
    childName: {type: GraphQLString},
    mobileNumber: {type: GraphQLString}
  })
});
