import React, {Component, PropTypes} from 'react';
import StyleSheet from './App.styl';
import title from '../../decorators/title';

@title(() => `Christian de Botton`)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  render() {
    return (
      <div className={StyleSheet.container}>
        <h1>React Relay Redux Universal Starter Kit</h1>
        {this.props.children}
      </div>
    );
  }
}
