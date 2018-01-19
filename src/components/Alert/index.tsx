import React from 'react';
import { MessageBar, MessageBarManager } from 'react-native-message-bar';
import { connect } from 'react-redux';
import { IInitialState } from 'services/reducers';
import { IException } from 'services/exceptions';
import I18n from 'I18n';
import { getLatestException } from 'services/selectors';

interface IProps {
  lastException: IException;
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

      MessageBarManager.showAlert({
        title: I18n.t(`alert.${exception.name}.title`),
        message: I18n.t(`alert.${exception.name}.message`),
        alertType: 'error',
        durationToHide: 20000,
      });
    }
  }

  render () {
    return <MessageBar ref={(c: Alert) => this.alert = c} />;
  }
}

const mapStateToProps = (state: IInitialState) => ({
  lastException: getLatestException(state),
});

export default connect(mapStateToProps)(Alert);
