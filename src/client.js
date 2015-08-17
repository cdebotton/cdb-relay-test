import React from 'react';
import ReactDOM from 'react-dom';
// import BrowserHistory from 'react-router/lib/BrowserHistory';
// import HashHistory from 'react-router/lib/HashHistory';
// import Application from './containers/Application';
// import Client from './containers/Client';

// let history;
// try {
//   history = new BrowserHistory();
// } catch (ex) {
//   history = new HashHistory();
// }

require('font-awesome/css/font-awesome.css');

import Relay from 'react-relay';

class TestComponent extends React.Component {
  render() {
    return (
      <pre>{JSON.stringify(this.props.test, null, 2)}</pre>
    );
  }
}

const TestContainer = Relay.createContainer(TestComponent, {
  fragments: {
    users: () => Relay.QL`
      fragment on User @relay(plural: true) {
        id,
        email,
        firstName,
        lastName,
      }
    `,
  },
});

class TestRoute extends Relay.Route {
  static routeName = 'TestRoute'
  static path = '/'
  static queries = {
    test: (Component) => Relay.QL`
      query {
        test {
          ${Component.getFragment('test')},
        },
      }
    `
  }
}

import UsersRoute from './relay/UsersRoute';

ReactDOM.render((
  <Relay.RootContainer
    Component={TestContainer}
    route={new UsersRoute()} />
), document.getElementById('mount'));

// ReactDOM.render((
//   <Application>
//     <Client history={history} />
//   </Application>
// ), document.getElementById('mount'));
