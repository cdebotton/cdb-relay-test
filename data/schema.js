import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';

import {
  Viewer,
  getViewer,
} from './viewer';

import {
  User,
} from './models';

const {nodeField, nodeInterface} = nodeDefinitions(
  (globalId) => {
    const {id, type} = fromGlobalId(globalId);
    switch (type) {
    case 'Viewer':
      return getViewer();
    case 'User':
      return User.find(id);
    default:
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Viewer) {
      return viewerType; // eslint-disable-line no-use-before-define
    } else if (obj instanceof User) {
      return userType; // eslint-disable-line no-use-before-define
    }
    return null;
  }
);

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    email: {
      type: GraphQLString,
      dscription: 'The user\'s email address',
    },
    lastLogin: {
      type: GraphQLString,
      dscription: 'The user\'s last login date',
    },
    createdAt: {
      type: GraphQLString,
      dscription: 'The user\'s account creation date',
    },
    updatedAt: {
      type: GraphQLString,
      dscription: 'The the last time that user\'s account was updated',
    },
  }),
  interfaces: [
    nodeInterface,
  ],
});

const {connectionType: UserConnection} = connectionDefinitions({
  name: 'User',
  nodeType: userType,
});

const reduceFieldsFromAST = (fieldASTs) => {
  const selections = fieldASTs.selectionSet;
  return fieldASTs.reduce((memo, ast) => {
    if (ast.selectionSet) {
      return memo.concat(reduceFieldsFromAST(ast));
    }

    memo.push(selectionSet.name.value);

    return memo;
  }, []);
};

const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'The current user of the application',
  fields: () => ({
    id: globalIdField('Viewer'),
    users: {
      type: UserConnection,
      description: 'All users in the application',
      args: connectionArgs,
      resolve: (root, args, {fieldASTs}) => {
        // const fields = reduceFieldsFromAST(fieldASTs);
        // console.log(fields);
        return connectionFromPromisedArray(
          User.findAll({
            limit: args.first
          }),
          args
        );
      },
    },
  }),
  interfaces: [
    nodeInterface,
  ],
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    viewer: {
      type: viewerType,
      description: 'The current user of the application',
      resolve: () => getViewer(),
    },
    node: nodeField,
  }),
});

export const Schema = new GraphQLSchema({
  query: queryType,
});
