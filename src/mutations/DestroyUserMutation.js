import Relay, {Mutation} from 'react-relay';

export default class DestroyUserMutation extends Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
        email,
        createdAt,
        updatedAt,
      }
    `,
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
    return Relay.QL`mutation{destroyUser}`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on DestroyUserPayload {
        destroyedUserId,
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
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'users',
      deletedIDFieldName: 'destroyedUserId',
    }];
  }

  getVariables() {
    return {
      id: this.props.user.id,
    };
  }

  getOptimisticResponse() {
    let viewerPayload;
    if (this.props.viewer.users) {
      viewerPayload = {id: this.props.viewer.id, users: {}};
      if (this.props.viewer.users.totalCount > 0) {
        viewerPayload.users.totalCount -= 1;
      }
    }

    return {
      destroyedUserId: this.props.user.id,
      viewer: viewerPayload,
    };
  }
}
