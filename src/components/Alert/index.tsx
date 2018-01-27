import React from 'react';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';
import { connect } from 'react-redux';
import { IInitialState } from 'services/reducers';
import { IException } from 'services/exceptions';
import I18n from 'I18n';
import { getLatestException } from 'services/selectors';
import config from 'config';
import { Dispatch } from 'redux';
import * as signon from 'services/signon';

interface IProps {
  lastException: IException;
  signout: () => void;
}

class Alert extends React.Component<IProps> {

  private alert;

  componentDidMount () {
    MessageBarManager.registerMessageBar(this.alert);
  }

  componentWillUnmount () {
    MessageBarManager.unregisterMessageBar();
  }

  componentWillReceiveProps (nextProps: Partial<IProps>) {
    if (nextProps.lastException) {
      const exception = nextProps.lastException;
      const alertType = config.alerts[exception.name]
        ? config.alerts[exception.name].alertType : 'error';

      MessageBarManager.showAlert({
        alertType,
        title: I18n.t(`alert.${exception.name}.title`),
        message: I18n.t(`alert.${exception.name}.message`),
        durationToHide: 20000,
      });

      if (exception.name === 'INVALID_TOKEN') {
        this.props.signout();
      }
    }
  }

  render () {
    return <MessageBar ref={(c: Alert) => this.alert = c} />;
  }
}

const mapStateToDispatch = (dispatch: Dispatch<any>): Partial<IProps> => ({
  signout: () => dispatch(signon.actions.signout()),
});

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  lastException: getLatestException(state),
});

export default connect(mapStateToProps, mapStateToDispatch)(Alert);
