'use strict';

const GraphQLList = require('graphql').GraphQLList;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLNonNull = require('graphql').GraphQLNonNull;

const UserType = require('./type');
const validate = require('./validate');
const resolves = require('./resolves');

module.exports = {
  users: {
    type: new GraphQLList(UserType),
    description: 'List of users',
    args: {
      token: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: function(source, args) {
      return authorize(args.token, ['ADMIN_USER']).then(() => resolves.getAll());
    }
  },
  user: {
    type: UserType,
    description: 'Get a User by mobileNumber',
    args: {
      mobileNumber: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: function(source, args) {
      return validate(args).then(() => resolves.get(args.mobileNumber));
    }
  }
}
