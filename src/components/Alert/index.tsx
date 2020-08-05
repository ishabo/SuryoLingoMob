import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IInitialState } from '@sl/services/reducers';
import I18n from '@sl/i18n';
import { getLatestException } from '@sl/services/selectors';
import config from '@sl/config';
import { Dispatch } from 'redux';
import * as signon from '@sl/services/signon';
import * as api from '@sl/services/api/reducers';
import * as exceptions from '@sl/services/exceptions';
import FlashMessage, {
  MessageType,
  showMessage,
  hideMessage
} from 'react-native-flash-message';

interface IProps {
  removeException: (id: number) => void;
  lastException: exceptions.IException;
  apiStatus: api.IApiStatus;
  signout: () => void;
  removeAll: () => void;
}

const durationToHide = 20000;

const Alert = ({
  lastException,
  removeException,
  apiStatus,
  signout
}: IProps) => {
  const [doAlert, setDoAlert] = useState(false);
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);
  const [alertType, setAlertType] = useState<MessageType>('warning');

  useEffect(() => {
    if (lastException) {
      if (lastException.name === 'INVALID_TOKEN') {
        signout();
        return;
      }
      setAlertType(
        config.alerts[lastException.name]
          ? config.alerts[lastException.name].alertType
          : 'danger'
      );

      setTitle(I18n.t(`alert.${lastException.name}.title`));
      setMessage(I18n.t(`alert.${lastException.name}.message`));
      setDoAlert(!lastException.silent);
      removeException(lastException.id);
    }
  }, [lastException]);

  useEffect(() => {
    setDoAlert(apiStatus.alert && apiStatus.message !== null);
    setAlertType(apiStatus.success ? 'success' : 'warning');
    setTitle(I18n.t(`alert.GENERAL_API.title`));
    setMessage(I18n.t(`alert.GENERAL_API.messages.${apiStatus.message}`));
  }, [apiStatus]);

  useEffect(() => {
    if (doAlert) {
      showMessage({
        message: title,
        description: message,
        position: 'top',
        animated: true,
        icon: { icon: alertType, position: 'center' },
        floating: true,
        hideStatusBar: false,
        type: alertType,
        duration: durationToHide
      });
    } else {
      hideMessage();
    }
  }, [doAlert]);

  return <FlashMessage />;
};

const mapStateToDispatch = (dispatch: Dispatch<any>): Partial<IProps> => ({
  signout: () => dispatch(signon.actions.signout()),
  removeException: (id: number) => dispatch(exceptions.actions.remove(id)),
  removeAll: () => dispatch(exceptions.actions.removeAll())
});

const mapStateToProps = (state: IInitialState): Partial<IProps> => ({
  lastException: getLatestException(state),
  apiStatus: state.api
});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(Alert);
