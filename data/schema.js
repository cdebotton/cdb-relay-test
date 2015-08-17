import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
} from 'graphql-relay';

import {
  User,
  getUsers,
} from './mock-database';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {id, type} = fromGlobalId(globalId);
    switch (type) {
    case 'User':
      return getUser(id);
    default:
      return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return userType; // eslint-disable-line no-use-before-define
    }

    return null;
  },
);

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    avatar: {
      type: GraphQLString,
    },
  }),
  interfaces: [
    nodeInterface,
  ],
});

const {connectionType: userConnection} = connectionDefinitions({
  name: 'User',
  nodeType: userType,
});

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    node: nodeField,
    users: {
      type: userConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getUsers(), args),
    },
  }),
});

export const Schema = new GraphQLSchema({
  query: queryType,
});
