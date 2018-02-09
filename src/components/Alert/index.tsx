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
import * as api from 'services/api/reducers';

interface IProps {
  lastException: IException;
  apiStatus: api.IApiStatus;
  signout: () => void;
}

const durationToHide = 2000;
let doAlert: boolean = true;
let title: string;
let message: string;
let alertType: string = 'warning';

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
      alertType = config.alerts[exception.name]
        ? config.alerts[exception.name].alertType : 'error';
      title = I18n.t(`alert.${exception.name}.title`);
      message = I18n.t(`alert.${exception.name}.message`);
      doAlert = !exception.silent;

      if (exception.name === 'INVALID_TOKEN') {
        this.props.signout();
      }
    } else if (nextProps.apiStatus !== this.props.apiStatus) {
      doAlert = nextProps.apiStatus.alert && nextProps.apiStatus.message !== null;
      alertType = nextProps.apiStatus.success ? 'success' : 'warning';
      title = I18n.t(`alert.GENERAL_API.title`);
      message = I18n.t(`alert.GENERAL_API.messages.${nextProps.apiStatus.message}`);
    }

    if (doAlert) {
      MessageBarManager.showAlert({ alertType, title, message, durationToHide });
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
  apiStatus: state.api,
});

export default connect(mapStateToProps, mapStateToDispatch)(Alert);
