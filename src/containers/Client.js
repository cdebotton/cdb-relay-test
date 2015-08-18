import React, {Component, PropTypes} from 'react';
import Relay from 'react-relay';
import {Router} from 'react-router';
import RootRoute from '../routes/RootRoute';
import routes from '../routes';

export default class Client extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  render() {
    return (
      <Router
        createElement={(RouterComponent, routerProps) => {
          if (Relay.isContainer(RouterComponent)) {
            return (
              <Relay.RootContainer
                Component={RouterComponent}
                route={new RootRoute()} />
            );
          }

          return (
            <RouterComponent {...routerProps} />
          );
        }}
        history={this.props.history}>
        {routes}
      </Router>
    );
  }
}
