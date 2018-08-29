import { put, call, select } from 'redux-saga/effects';
import { ISagasFunctions } from 'services/sagas';
import { IInitialState } from 'services/reducers';
import * as settings from '../';
import { getSettings } from 'services/settings/api';
import { alertToUpdateApp, alertMaintenance } from 'helpers';
import { shouldUpdateApp, getDeviceSpecificSettings, isOnMaintenance } from 'services/selectors';

export function* fetchSettings(): IterableIterator<any> {
  const response: settings.IAppSettings = yield call(getSettings);
  yield put(settings.actions.saveSettings(response));
}

export function* checkStatuses(): IterableIterator<any> {
  if (yield select(isOnMaintenance)) {
    const maintenanceSettings: settings.IMaintenance = yield select(
      (state: IInitialState) => state.settings.maintenance
    );
    alertMaintenance(maintenanceSettings.showDefaultMessage, maintenanceSettings.message);
    return;
  }

  const device = yield select(getDeviceSpecificSettings);

  if (device) {
    if (yield select(shouldUpdateApp)) {
      alertToUpdateApp(device.update.force);
      return;
    }
  }
}

export const functions = (): ISagasFunctions[] => {
  return [
    { action: settings.actions.types.FETCH_SETTINGS, func: fetchSettings },
    {
      action: settings.actions.types.CHECK_STATUS,
      func: checkStatuses
    }
  ];
};
