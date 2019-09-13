import * as tslib_1 from "tslib";
import DeviceInfo from 'react-native-device-info';
import { Messaging } from 'config/firebase';
const deviceDetails = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    return ({
        fcmToken: yield Messaging.getToken(),
        installId: '',
        deviceId: DeviceInfo.getDeviceId(),
        deviceName: DeviceInfo.getDeviceName(),
        appVersion: DeviceInfo.getVersion(),
        phoneModel: DeviceInfo.getModel(),
        deviceLocale: DeviceInfo.getDeviceLocale(),
        deviceCountry: DeviceInfo.getDeviceCountry(),
        timeZone: DeviceInfo.getTimezone(),
        apiLevel: Number.isInteger(DeviceInfo.getAPILevel()) ? DeviceInfo.getAPILevel() : null,
        firstInstallTime: DeviceInfo.getFirstInstallTime(),
        lastUpdateTime: DeviceInfo.getFirstInstallTime()
    });
});
export const injectDeviceInfo = (payload = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    return (Object.assign({}, payload, { deviceInfo: yield deviceDetails() }));
});
//# sourceMappingURL=index.js.map