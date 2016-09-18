'use strict';

const GraphQL = require('graphql')
const GraphQLObjectType = GraphQL.GraphQLObjectType;
const GraphQLSchema = GraphQL.GraphQLSchema;
const _ = require('lodash');
const queries = {}, mutations = {};

// add your collections here
const collections = [
  'users',
  'parties',
  'invites'
];

// load collections queries and muataions

  _.assign(queries, require("./collections/users/queries"));
  _.assign(mutations, require("./collections/users/mutations"));
  _.assign(queries, require("./collections/parties/queries"));
  _.assign(mutations, require("./collections/parties/mutations"));
  _.assign(queries, require("./collections/invites/queries"));
  _.assign(mutations, require("./collections/invites/mutations"));

const Queries = new GraphQLObjectType({
  name: 'Root',
  description: 'Root of the Schema',
  fields: queries
});

const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: mutations
});

module.exports = new GraphQLSchema({
  query: Queries,
  mutation: Mutations
});
