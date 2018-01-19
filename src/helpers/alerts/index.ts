import { Alert } from 'react-native';
import I18n from 'I18n';

export const alertConnection = (
  onReconnect: () => void,
  onCancel: () => void,
  onDismiss: () => void,
  cancelable: boolean = false,
) => {
  Alert.alert(
    I18n.t('general.retry.title'),
    I18n.t('general.retry.reason'),
    [
      { text: I18n.t('general.retry.reconnect'), onPress: onReconnect },
      {
        text: I18n.t('general.retry.cancelAndExist'), onPress: onCancel,
        style: 'cancel',
      },
    ],
    { onDismiss, cancelable },
  );
};
