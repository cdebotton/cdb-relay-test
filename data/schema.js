import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
} from 'graphql-relay';

class Viewer extends Object {}
class User extends Object {}
const getViewer = () => new Viewer();
const getUser = () => new User();

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type} = fromGlobalId(globalId);
    switch (type) {
    case 'Viewer':
      return getViewer();
    case 'User':
      return getUser();
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
  }),
  interfaces: [
    nodeInterface,
  ],
});


const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: globalIdField('Viewer'),
    users: {
      type: new GraphQLList(userType),
    },
  }),
  interfaces: [
    nodeInterface,
  ],
});

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: new GraphQLNonNull(viewerType),
      resolve: () => getViewer(),
    },
  }),
});

export const Schema = new GraphQLSchema({
  query: queryType,
});
