import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as UIActions from '../actions/UIActions';

export default function title(documentTitle) {
  const getTitleString = (props) => {
    if (typeof documentTitle === 'function') {
      return documentTitle(props);
    }
    return documentTitle;
  };

  return (TargetClass) => {
    @connect(({ui}) => ({
      title: ui.title,
    }))
    class TitleComponent extends Component {
      static propTypes = {
        dispatch: PropTypes.func.isRequired,
      }

      componentWillMount() {
        const titleString = getTitleString(this.props);

        this.props.dispatch(UIActions.setTitle(titleString));

        if (typeof document !== 'undefined') {
          document.title = titleString;
        }
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
