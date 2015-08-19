import React, {Component, PropTypes} from 'react';
import Relay from 'react-relay';
import StyleSheet from './UserBadge.styl';
import DestroyUserMutation from '../../mutations/DestroyUserMutation';

class UserBadge extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    return (
      <div className={StyleSheet.container}>
        <a href={`mailto:${this.props.user.email}`}>
          {this.props.user.email}
        </a>

        <button
          onClick={() => Relay.Store.update(
            new DestroyUserMutation({
              user: this.props.user,
              viewer: this.props.viewer,
            })
          )}
          type="button">
          Destroy
        </button>
      </div>
    );
  }
}

export default Relay.createContainer(UserBadge, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        id,
        email,
        ${DestroyUserMutation.getFragment('user')}
      }
    `,
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${DestroyUserMutation.getFragment('viewer')}
      }
    `
  },
});
