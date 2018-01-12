import { create } from 'services/api';
import { IProfilePayload } from '../';
import DeviceInfo from 'react-native-device-info';

const deviceDetails = () => ({
  deviceId: DeviceInfo.getDeviceId(),
  deviceName: DeviceInfo.getDeviceName(),
  appVersion: DeviceInfo.getVersion(),
  phoneModel: DeviceInfo.getModel(),
  deviceLocale: DeviceInfo.getDeviceLocale(),
  deviceCountry: DeviceInfo.getDeviceCountry(),
  timeZone: DeviceInfo.getTimezone(),
  apiLevel: Number.isInteger(DeviceInfo.getAPILevel()) ? DeviceInfo.getAPILevel() : null,
  firstInstallTime: DeviceInfo.getFirstInstallTime(),
  lastUpdateTime: DeviceInfo.getFirstInstallTime(),
});

export const createProfile = (payload: IProfilePayload = {}) => {
  // Creating Profile is the only API call that's done with a default token
  return create().post('/users', injectDeviceInfo(payload));
};

export const updateProfile = (id: string) => (payload: IProfilePayload = {}) => {
  return create().put(`/users/${id}`, injectDeviceInfo(payload));
};

const injectDeviceInfo = (payload: IProfilePayload = {}) =>
  ({ ...payload, deviceInfo: deviceDetails() });
