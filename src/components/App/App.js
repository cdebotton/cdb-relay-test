import React, {Component, PropTypes} from 'react';
import StyleSheet from './App.styl';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  render() {
    return (
      <div className={StyleSheet.container}>
        <h1>App</h1>
        {this.props.children}
      </div>
    );
  }
}
