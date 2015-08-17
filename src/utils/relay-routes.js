import * as routes from '../relay';

export function matchRoute(pathname) {
  for (const routeName of Object.keys(routes)) {
    const route = routes[routeName];

    if (route.path === pathname) {
      return route;
    }
  }

  return false;
}
