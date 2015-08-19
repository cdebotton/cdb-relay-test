import React, {Component, PropTypes} from 'react';
import Relay from 'react-relay';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import StyleSheet from './Home.styl';
import UserBadge from '../UserBadge';
import * as SampleActions from '../../actions/SampleActions';
import title from '../../decorators/title';
import CreateUserMutation from '../../mutations/CreateUserMutation';

@title(() => `Home | Christian de Botton`)
class Home extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    isIncreasing: PropTypes.bool.isRequired,
    increase: PropTypes.func.isRequired,
    decrease: PropTypes.func.isRequired,
    increaseAsync: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
  }

  renderUsers() {
    if (!this.props.users.length) {
      return false;
    }

    return this.props.users.map((user, key) => {
      return (
        <UserBadge
          key={key}
          user={user} />
      );
    });
  }

  render() {
    const users = this.renderUsers();

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
        <div className={StyleSheet.users}>
          <h3>Users</h3>
          <form onSubmit={::this.handleCreateUser}>
            <input
              ref={(c) => this._newEmail = c}
              type="email" />
            <button type="submit">Create</button>
          </form>
          {users}
        </div>
      </div>
    );
  }

  handleCreateUser(event) {
    event.preventDefault();
    const {value: email} = this._newEmail;

    Relay.Store.update(
      new CreateUserMutation({email, viewer: this.props.viewer})
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
    viewer: PropTypes.object.isRequired,
  }

  render() {
    const {dispatch, ...props} = this.props;
    const sampleActions = bindActionCreators(SampleActions, dispatch);
    const users = this.props.viewer.users.edges.map((edge) => edge.node);

    return (
      <Home
        users={users}
        {...sampleActions}
        {...props}
        {...this.props} />
    );
  }
}

export default Relay.createContainer(HomeConnector, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        users(first: 100) {
          edges {
            node {
              ${UserBadge.getFragment('user')}
            },
          },
        },
        ${CreateUserMutation.getFragment('viewer')},
      }
    `,
  },
});
