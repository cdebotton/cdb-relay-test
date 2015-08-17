import React, {Component, PropTypes} from 'react';
import Relay from 'react-relay';
import {Router} from 'react-router';
import routes from '../routes';
import {matchRoute} from '../utils/relay-routes';

export default class Client extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  render() {
    return (
      <Router
        createElement={(RouterComponent, routerProps) => {
          if (Relay.isContainer(RouterComponent)) {
            const {pathname} = routerProps.location;
            const Route = matchRoute(pathname);

            if (Route) {
              return (
                <Relay.RootContainer
                  Component={RouterComponent}
                  route={new Route()} />
              );
            }
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
