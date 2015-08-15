import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import StyleSheet from './Home.styl';
import * as SampleActions from '../../actions/SampleActions';

class Home extends Component {
  static propTypes = {
    sample: PropTypes.number.isRequired,
    increase: PropTypes.func.isRequired,
    decrease: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className={StyleSheet.container}>
        <h2><i className="fa fa-home" /> Home</h2>
        <p><strong>Sample:</strong> {this.props.sample}</p>
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
      </div>
    );
  }
}

@connect((state) => ({
  sample: state.sample,
}))
export default class HomeConnector extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    const {dispatch, ...props} = this.props;
    const sampleActions = bindActionCreators(SampleActions, dispatch);

    return (
      <Home
        {...sampleActions}
        {...props} />
    );
  }
}
