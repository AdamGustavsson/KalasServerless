'use strict';

const GraphQLString = require('graphql').GraphQLString;
const GraphQLNonNull = require('graphql').GraphQLNonNull;

const authorize = require('../../../auth').authorize;
const InviteType = require('./type');
const validate = require('./validate');
const resolves = require('./resolves');

module.exports = {
  createInvite: {
    type: InviteType,
    description: 'Invite a guest',
    args: {
      token: { type: new GraphQLNonNull(GraphQLString) },
      childName: {type: new GraphQLNonNull(GraphQLString)},
      mobileNumber: {type: new GraphQLNonNull(GraphQLString)},
      partyId:   {type: new GraphQLNonNull(GraphQLString)},
        
    },
    resolve(source, args) {
      return validate(args).then(() => authorize(args.token, ['CREATE_PARTY'])).then((user) => {
          args.hostUser=user.id; 
          resolves.create(args);
      });
    }
  }
}