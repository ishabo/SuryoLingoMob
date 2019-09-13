import { put, call, select } from 'redux-saga/effects';
import * as settings from '../';
import { getSettings } from 'services/settings/api';
import { alertToUpdateApp, alertMaintenance } from 'helpers';
import { shouldUpdateApp, getDeviceSpecificSettings, isOnMaintenance } from 'services/selectors';
export function* fetchSettings() {
    try {
        const response = yield call(getSettings);
        yield put(settings.actions.saveSettings(response));
    }
    catch (error) { }
}
export function* checkStatuses() {
    const profile = yield select((state) => state.profile);
    if (yield select(isOnMaintenance)) {
        const maintenanceSettings = yield select((state) => state.settings.maintenance);
        alertMaintenance(maintenanceSettings.showDefaultMessage, maintenanceSettings.message, profile.isTester !== null);
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
export const functions = () => {
    return [
        { action: settings.actions.types.FETCH_SETTINGS, func: fetchSettings },
        {
            action: settings.actions.types.CHECK_STATUS,
            func: checkStatuses
        }
    ];
};
//# sourceMappingURL=index.js.map