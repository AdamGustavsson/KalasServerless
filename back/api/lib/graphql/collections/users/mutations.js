'use strict';

const GraphQLString = require('graphql').GraphQLString;
const GraphQLNonNull = require('graphql').GraphQLNonNull;

const UserType = require('./type');
const validate = require('./validate');
const authorize = require('../../../auth').authorize;
const resolves = require('./resolves');

module.exports = {
  createUser: {
    type: UserType,
    description: 'Create User',
    args: {
      mobileNumber: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args) {
      return validate(args).then(() => resolves.create(args));
    }
  },
  loginUser: {
    type: UserType,
    description: 'Login User',
    args: {
      mobileNumber: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args) {
      return validate(args).then(() => resolves.login(args));
    }
  },
  updateUser: {
    type: UserType,
    description: 'Update User',
    args: {
      token: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args) {
      return validate(args).then(() => authorize(args.token, ['PARENT_USER'])).then((user) => resolves.update(user, args));
    }
  },
  deleteUser: {
    type: UserType,
    description: 'Delete User',
    args: {
      token: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args) {
      return validate(args).then(() => authorize(args.token, ['ADMIN_USER'])).then((user) => resolves.remove(user));
    }
  }
}
