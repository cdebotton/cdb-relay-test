import {
  applyMiddleware,
  compose,
  createStore as reduxCreateStore,
  combineReducers,
} from 'redux';

import thunk from 'redux-thunk';
import {devTools} from 'redux-devtools';
import * as reducers from './reducers';

const ENV = process.env.NODE_ENV || 'development';
const reducer = combineReducers(reducers);

let createStore;
if (ENV === 'development') {
  createStore = applyMiddleware(thunk)(compose(devTools(), reduxCreateStore));
} else {
  createStore = applyMiddleware(thunk)(reduxCreateStore);
}

export default createStore(reducer);
