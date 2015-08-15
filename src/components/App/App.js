import React, {Component, PropTypes} from 'react';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  render() {
    return (
      <div>
        <h1>App</h1>
        {this.props.children}
      </div>
    );
  }
}
