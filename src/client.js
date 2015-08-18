import React from 'react';
import ReactDOM from 'react-dom';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import HashHistory from 'react-router/lib/HashHistory';
import Application from './containers/Application';
import Client from './containers/Client';
import 'font-awesome/css/font-awesome.css';

let history;
try {
  history = new BrowserHistory();
} catch (ex) {
  history = new HashHistory();
}

ReactDOM.render((
  <Application>
    <Client history={history} />
  </Application>
), document.getElementById('mount'));

