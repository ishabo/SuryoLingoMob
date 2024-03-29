import { Alert, AlertButton } from 'react-native'
import I18n from '@sl/i18n'
import { exitApp, goToAppStore } from '@sl/helpers/common'
import { TSignonFacebookErrors, TSignonEmailErrors } from '@sl/services/signon'

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
        text: I18n.t('general.cancelAndExist'),
        onPress: onCancel,
        style: 'cancel',
      },
    ],
    { onDismiss, cancelable },
  )
}

export const alertMaintenance = (
  showDefaultMessage: boolean,
  message: IDictionary<string>,
  allowBypass?: boolean,
) => {
  const close = { text: I18n.t('general.close'), onPress: exitApp }
  const ok = allowBypass
    ? { text: I18n.t('general.continue'), onPress: () => {} }
    : null
  Alert.alert(
    '',
    showDefaultMessage
      ? I18n.t('maintenance.message')
      : message[I18n.t('lang')],
    [close, ok],

    { cancelable: false },
  )
}

export const alertToUpdateApp = (force: boolean) => {
  const message = I18n.t('update.message')
  const actions: AlertButton[] = [
    { text: I18n.t('update.actions.update'), onPress: goToAppStore },
  ]
  if (!force) {
    actions.push({
      text: I18n.t('update.actions.cancel'),
      onPress: () => {},
      style: 'cancel',
    })
  }
  Alert.alert('', message, actions, { cancelable: !force })
}

export type TAlertContext = 'signon'
export type TAlertSubject =
  | 'signupReason'
  | 'signupName'
  | 'signupEmail'
  | 'signinReason'
  | 'signinEmail'
  | 'signinPassword'

export const showAlert = (
  context: TAlertContext,
  subject: TAlertSubject | TSignonFacebookErrors | TSignonEmailErrors,
) => {
  setTimeout(() => {
    Alert.alert(
      I18n.t(`${context}.alerts.${subject}.title`),
      I18n.t(`${context}.alerts.${subject}.description`),
      [{ text: I18n.t('general.close'), onPress: () => {} }],
      { cancelable: false },
    )
  }, 1000)
}
