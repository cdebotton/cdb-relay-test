import React, {Component} from 'react';
import StyleSheet from './Home.styl';

export default class Home extends Component {
  render() {
    return (
      <div className={StyleSheet.container}>
        <h2><i className="fa fa-home" /> Home</h2>
      </div>
    );
  }
}
