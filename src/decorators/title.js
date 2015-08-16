import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as UIActions from '../actions/UIActions';

export default function title(documentTitle) {
  return (TargetClass) => {
    @connect(({ui}) => ({
      title: ui.title,
    }))
    class TitleComponent extends Component {
      static propTypes = {
        dispatch: PropTypes.func.isRequired,
      }

      componentWillMount() {
        this.props.dispatch(UIActions.setTitle(documentTitle));
      }

      componentDidMount() {
        document.title = documentTitle;
      }

      render() {
        return (
          <TargetClass {...this.props} />
        );
      }
    }

    return TitleComponent;
  };
}
