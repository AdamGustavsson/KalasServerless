'use strict';

const GraphQLList = require('graphql').GraphQLList;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLNonNull = require('graphql').GraphQLNonNull;
const authorize = require('../../../auth').authorize;

const InviteType = require('./type');
const validate = require('./validate');
const resolves = require('./resolves');

module.exports = {
  invites_for_party: {
    type: new GraphQLList(InviteType),
    description: 'List of all invites for a party',
    args: {
      token: { type: new GraphQLNonNull(GraphQLString) },
      partyId: {type: new GraphQLNonNull(GraphQLString)}    
    },
    resolve: function(source, args) {
      return authorize(args.token, ['LIST_OWN_PARTIES']).then((user) => resolves.getInvitesForParty(args.partyId));
    }
  }
}