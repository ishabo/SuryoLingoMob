import { put, call, select } from 'redux-saga/effects'
import { ISagasFunctions } from '@sl/services/sagas'
import { IInitialState } from '@sl/services/reducers'
import * as settings from '../'

import { getSettings } from '@sl/services/settings/api'
import { alertToUpdateApp, alertMaintenance } from '@sl/helpers'
import {
  shouldUpdateApp,
  getDeviceSpecificSettings,
  isOnMaintenance,
} from '@sl/services/selectors'
import { IDeviceSettings } from '@sl/services/settings'
import { IProfile } from '@sl/services/profile'

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
      return
    }
  }
}

export const functions = (): ISagasFunctions[] => [
  { action: settings.actions.types.FETCH_SETTINGS, func: fetchSettings },
  {
    action: settings.actions.types.CHECK_STATUS,
    func: checkStatuses,
  },
]
