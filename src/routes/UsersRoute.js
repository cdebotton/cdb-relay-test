import Relay, {Route} from 'react-relay';

export default class extends Route {
  static routeName = 'UsersRoute'
  static path = '/'
  static queries = {
    viewer: (Component) => Relay.QL`
      query {
        viewer {
          ${Component.getQuery('viewer')},
        },
      }
    `,
  }
}
