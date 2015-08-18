import React, {Component, PropTypes} from 'react';
import Relay from 'react-relay';

class UserBadge extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    return (
      <div>
        <a href={`mailto:${this.props.user.email}`}>
          {this.props.user.email}
        </a>
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
        lastLogin,
        createdAt,
      }
    `,
  },
});
