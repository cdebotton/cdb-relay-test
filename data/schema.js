import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
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

class Test extends Object {}
const getTest = () => {
  const test = new Test();
  test.id = 1;
  test.value = 'Hello, world!';

  return test;
}

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {id, type} = fromGlobalId(globalId);
    switch (type) {
    case 'User':
      return getUser(id);
    case 'Test':
      return getTest(id);
    default:
      return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return userType; // eslint-disable-line no-use-before-define
    }
    if (obj instanceof Test) {
      return testType; // eslint-disable-line no-use-before-define
    }

    return null;
  },
);

const testType = new GraphQLObjectType({
  name: 'Test',
  fields: () => ({
    id: globalIdField('Test'),
    value: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The test value',
    }
  }),
  interfaces: [
    nodeInterface,
  ],
});

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
  name: 'Query',
  fields: () => ({
    node: nodeField,
    testField: {
      type: GraphQLString,
      description: 'A test field',
      resolve: () => 'Hello, world!',
    },
    users: {
      type: new GraphQLList(userType),
      resolve: (_, args) => getUsers(),
    },
    test: {
      type: testType,
      resolve: () => getTest(),
    }
  }),
});

export const Schema = new GraphQLSchema({
  query: queryType,
});
