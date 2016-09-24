'use strict';

const GraphQLString = require('graphql').GraphQLString;
const GraphQLNonNull = require('graphql').GraphQLNonNull;

const authorize = require('../../../auth').authorize;
const PartyType = require('./type');
const validate = require('./validate');
const resolves = require('./resolves');

module.exports = {
  createParty: {
    type: PartyType,
    description: 'Create Party',
    args: {
      hostUser: { type: new GraphQLNonNull(GraphQLString) },
      description: {type: new GraphQLNonNull(GraphQLString)},
      header: {type: new GraphQLNonNull(GraphQLString)},
      childName: {type: new GraphQLNonNull(GraphQLString)},
      startDateTime:   {type: new GraphQLNonNull(GraphQLString)},
      endDateTime:   {type: new GraphQLNonNull(GraphQLString)},
      partyLocation:   {type: new GraphQLNonNull(GraphQLString)},
      locale: {type: new GraphQLNonNull(GraphQLString)}

    },
    resolve(source, args) {
      return validate(args).then(() => resolves.create(args));
    }
  },
  setThemeOnParty: {
    type: PartyType,
    description: 'set a theme to a Party',
    args: {
      id: {type: new GraphQLNonNull(GraphQLString)},
      theme: {type: GraphQLString}
    },
    resolve(source, args) {
      return validate(args).then(() => resolves.setThemeOnParty(args.id,args.theme));
    }
  },
  updateParty: {
    type: PartyType,
    description: 'Update Party',
    args: {
      token: { type: new GraphQLNonNull(GraphQLString) },
      id: {type: new GraphQLNonNull(GraphQLString)},
      description: {type: GraphQLString},
      header: {type: GraphQLString},
      childName: {type: GraphQLString},
      startDateTime:   {type: GraphQLString},
      endDateTime:   {type: GraphQLString},
      partyLocation:   {type: GraphQLString},
      theme: {type: GraphQLString}

    },
    resolve(source, args) {
      return validate(args).then(() => resolves.get(args.id)).then((party) => authorize(args.token, ['PARENT_USER'])).then((party) => resolves.update(party, args));
        //return validate(args).then(() => resolves.update(party,args));
    }
  },
  deleteParty: {
    type: PartyType,
    description: 'Delete Party',
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args) {
        return validate(args).then(() => resolves.get(args.id)).then((party) => resolves.remove(args.id));
    }
  }
}
