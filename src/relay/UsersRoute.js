import Relay, {Route} from 'react-relay';

export default class extends Route {
  static routeName = 'UsersRoute'
  static path = '/'
  static queries = {
    users: (Component) => {
      return Relay.QL`
        query {
          users {
            ${Component.getFragment('users')},
          },
        }
      `;
    },
  }
}
