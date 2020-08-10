import { put, call, select } from 'redux-saga/effects'
import { ISagasFunctions } from '@sl/services/sagas'
import { IInitialState } from '@sl/services/reducers'

import { getSettings } from '@sl/services/settings/api'
import { alertToUpdateApp, alertMaintenance } from '@sl/helpers'
import {
  shouldUpdateApp,
  getDeviceSpecificSettings,
  isOnMaintenance,
} from '@sl/services/selectors'
import { IDeviceSettings } from '@sl/services/settings'
import { types } from '@sl/services/settings/actions'
import { IProfile } from '@sl/services/profile'
import * as settings from '..'

export function* fetchSettings(): IterableIterator<any> {
  try {
    const response: settings.IAppSettings = yield call(getSettings)
    yield put(settings.actions.saveSettings(response))
  } catch (error) {}
}

export function* checkStatuses(): IterableIterator<any> {
  const profile: IProfile = yield select(
    (state: IInitialState) => state.profile,
  )
  if (yield select(isOnMaintenance)) {
    const maintenanceSettings: settings.IMaintenance = yield select(
      (state: IInitialState) => state.settings.maintenance,
    )
    alertMaintenance(
      maintenanceSettings.showDefaultMessage,
      maintenanceSettings.message,
      profile.isTester !== null,
    )
    return
  }

  const device: IDeviceSettings = yield select(getDeviceSpecificSettings)

  if (device) {
    if (yield select(shouldUpdateApp)) {
      alertToUpdateApp(device.update.force)
    }
  }
}

export const functions = (): ISagasFunctions[] => [
  { action: types.FETCH_SETTINGS, func: fetchSettings },
  {
    action: types.CHECK_STATUS,
    func: checkStatuses,
  },
]
