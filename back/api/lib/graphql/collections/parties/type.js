'use strict';

const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLString = require('graphql').GraphQLString;
const resolves = require('./resolves');

const Venue = new GraphQLObjectType({
  name: 'Venue',
  description: 'Venue',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    text: {type: GraphQLString},
    url: {type: GraphQLString},
    image: {type: GraphQLString}
  })
});

const Party = new GraphQLObjectType({
  name: 'Party',
  description: 'Party',
  fields: () => ({
    id: {type: GraphQLString},
    header: {type: GraphQLString},
    description: {type: GraphQLString},
    hostUser: {type: GraphQLString},
    childName: {type: GraphQLString},
    startDateTimeUnix:   {type: GraphQLString},
    startDateTime:   {type: GraphQLString},
    endDateTime:   {type: GraphQLString},
    partyLocation: {type: GraphQLString},
    locale: {type: GraphQLString},
    theme: {type: GraphQLString},
    venue: {type: Venue,
    resolve: function(party){
      return resolves.getVenueOfParty(party.partyLocation)
    }}
  })
});

module.exports = Party;
