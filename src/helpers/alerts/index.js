import { Alert } from 'react-native';
import I18n from 'I18n';
import { exitApp, goToAppStore } from 'helpers';
export const alertConnection = (onReconnect, onCancel, onDismiss, cancelable = false) => {
    Alert.alert(I18n.t('general.retry.title'), I18n.t('general.retry.reason'), [
        { text: I18n.t('general.retry.reconnect'), onPress: onReconnect },
        {
            text: I18n.t('general.cancelAndExist'),
            onPress: onCancel,
            style: 'cancel'
        }
    ], { onDismiss, cancelable });
};
export const alertMaintenance = (showDefaultMessage, message, allowBypass) => {
    const close = { text: I18n.t('general.close'), onPress: exitApp };
    const ok = allowBypass ? { text: I18n.t('general.continue'), onPress: () => { } } : null;
    Alert.alert('', showDefaultMessage ? I18n.t('maintenance.message') : message[I18n.t('lang')], [close, ok], { cancelable: false });
};
export const alertToUpdateApp = (force) => {
    const message = I18n.t('update.message');
    const actions = [{ text: I18n.t('update.actions.update'), onPress: goToAppStore }];
    if (!force) {
        actions.push({ text: I18n.t('update.actions.cancel'), onPress: () => { }, style: 'cancel' });
    }
    Alert.alert('', message, actions, { cancelable: !force });
};
export const showAlert = (context, subject) => {
    setTimeout(() => {
        Alert.alert(I18n.t(`${context}.alerts.${subject}.title`), I18n.t(`${context}.alerts.${subject}.description`), [{ text: I18n.t('general.close'), onPress: () => { } }], { cancelable: false });
    }, 1000);
};
//# sourceMappingURL=index.js.map