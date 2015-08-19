import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
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
      type: new GraphQLNonNull(GraphQLString),
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

const {
  connectionType: UserConnection,
  edgeType: UserEdge,
} = connectionDefinitions({
  name: 'User',
  nodeType: userType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      resolve: (conn) => conn.edges.length,
    },
  }),
});

const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'The current user of the application',
  fields: () => ({
    id: globalIdField('Viewer'),
    users: {
      type: UserConnection,
      description: 'All users in the application',
      args: connectionArgs,
      resolve: (root, args) => connectionFromPromisedArray(
        User.findAll({
          limit: args.first,
        }),
        args
      ),
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

const destroyUserMutation = mutationWithClientMutationId({
  name: 'DestroyUser',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    destroyedUserId: {
      type: GraphQLID,
      resolve: ({id}) => id,
    },
    viewer: {
      type: viewerType,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: async ({id}) => {
    const {id: userID} = fromGlobalId(id);
    const user = await User.findById(userID);
    await user.destroy();
    return {id};
  },
});

const createUserMutation = mutationWithClientMutationId({
  name: 'CreateUser',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    userEdge: {
      type: UserEdge,
      resolve: async ({localUserId}) => {
        const user = await User.findById(localUserId);

        return {
          cursor: '',
          node: user,
        };
      },
    },
    viewer: {
      type: viewerType,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: async ({email}) => {
    const user = await User.create({email});
    return {localUserId: user.id};
  },
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    createUser: createUserMutation,
    destroyUser: destroyUserMutation,
  }),
});

export const Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
