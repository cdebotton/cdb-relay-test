import React, {Component, PropTypes} from 'react';
import Relay from 'react-relay';
import {Router} from 'react-router';
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
            const {Route} = routerProps.route;

            if (!Route) {
              throw new Error(
                `You must assign a Relay {Route} on route: ` +
                `${RouterComponent.displayName} at path ` +
                `${routerProps.route.path}.`
              );
            }

            return (
              <Relay.RootContainer
                Component={RouterComponent}
                route={new Route()} />
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
