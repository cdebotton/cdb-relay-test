import Relay, {Mutation} from 'react-relay';

export default class CheckUserMutation extends Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
        users {
          totalCount,
        },
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation{createUser}`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateUserPayload {
        userEdge,
        viewer {
          users {
            totalCount,
          },
        },
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'users',
      edgeName: 'userEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }

  getVariables() {
    return {
      email: this.props.email,
    };
  }

  getOptimisticResponse() {
    return {
      userEdge: {
        node: {
          email: this.props.email,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      },
      viewer: {
        id: this.props.viewer.id,
        users: {
          totalCount: this.props.viewer.users.totalCount + 1,
        },
      },
    };
  }
}
