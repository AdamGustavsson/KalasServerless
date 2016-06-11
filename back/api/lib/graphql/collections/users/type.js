'use strict';

const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLString = require('graphql').GraphQLString;

module.exports = new GraphQLObjectType({
  name: 'User',
  description: 'User',
  fields: () => ({
    id: {type: GraphQLString},
    mobileNumber: {type: GraphQLString},
    name: {type: GraphQLString},
    token: {type: GraphQLString}
  })
});
