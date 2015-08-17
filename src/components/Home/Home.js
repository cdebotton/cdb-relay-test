import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Relay from 'react-relay';
import StyleSheet from './Home.styl';
import * as SampleActions from '../../actions/SampleActions';
import title from '../../decorators/title';

@title(() => `Home | Christian de Botton`)
class Home extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    isIncreasing: PropTypes.bool.isRequired,
    increase: PropTypes.func.isRequired,
    decrease: PropTypes.func.isRequired,
    increaseAsync: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className={StyleSheet.container}>
        <h2><i className="fa fa-home" /> Home</h2>
        <p><strong>Sample:</strong> {this.props.count}</p>
        <button
          className={StyleSheet.incrementor}
          onClick={() => this.props.increase()}
          type="button"
          children="+" />
        <button
          className={StyleSheet.decrementor}
          onClick={() => this.props.decrease()}
          type="button"
          children="-" />
        <button
          className={StyleSheet.decrementor}
          onClick={() => this.props.increaseAsync()}
          disabled={this.props.isIncreasing}
          type="button"
          children="+ Async" />
      </div>
    );
  }
}

@connect((state) => ({
  count: state.sample.count,
  isIncreasing: state.sample.isIncreasing,
}))

class HomeConnector extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.any.isRequired,
  }

  render() {
    const {dispatch, ...props} = this.props;
    const sampleActions = bindActionCreators(SampleActions, dispatch);

    console.log(this.props.test);

    return (
      <Home
        {...sampleActions}
        {...props} />
    );
  }
}

export default Relay.createContainer(HomeConnector, {
  fragments: {
    users: () => Relay.QL`
      fragment on User @relay(plural: true) {
        id,
        email,
        firstName,
        lastName,
      }
    `,
  },
});
