'use strict';

const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLString = require('graphql').GraphQLString;

module.exports = new GraphQLObjectType({
  name: 'Party',
  description: 'Party',
  fields: () => ({
    id: {type: GraphQLString},
    header: {type: GraphQLString},
    description: {type: GraphQLString},
    hostUser: {type: GraphQLString},
    childName: {type: GraphQLString},
    startDateTime:   {type: GraphQLString},
    endDateTime:   {type: GraphQLString},
    partyLocation: {type: GraphQLString}
      
  })
});
