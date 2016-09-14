'use strict';

const GraphQLList = require('graphql').GraphQLList;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLNonNull = require('graphql').GraphQLNonNull;
const authorize = require('../../../auth').authorize;

const PartyType = require('./type');
const validate = require('./validate');
const resolves = require('./resolves');

module.exports = {
  users_parties: {
    type: new GraphQLList(PartyType),
    description: 'List of all a user parties',
    args: {
      token: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: function(source, args) {
      return authorize(args.token, ['PARENT_USER']).then((user) => resolves.getAllForUser(user.mobileNumber));
    }
  },
  party: {
    type: PartyType,
    description: 'Get a Party by id',
    args: {
      id: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: function(source, args) {
      return validate(args).then(() => resolves.get(args.id));
    }
  }
}
