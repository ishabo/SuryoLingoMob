import DeviceInfo from 'react-native-device-info';
import { Messaging } from '@sl/config/firebase';

const deviceDetails = async () => ({
  fcmToken: await Messaging.getToken(),
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

export const injectDeviceInfo = async (payload = {}) => ({
  ...payload,
  deviceInfo: await deviceDetails()
});
