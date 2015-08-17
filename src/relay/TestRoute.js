import Relay, {Route} from 'react-relay';

export default class extends Route {
  static routeName = 'TestRoute'
  static path = '/'
  static queries = {
    test: (Component) => {
      return Relay.QL`
        query {
          test {
            ${Component.getFragment('test')},
          },
        }
      `;
    },
  }
}
