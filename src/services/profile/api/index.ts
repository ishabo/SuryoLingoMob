import { create, TMethod } from '../../api';
import { IProfilePayload } from '../';
import DeviceInfo from 'react-native-device-info';
import { setUserToken } from 'services/api';
import { TOKEN } from 'react-native-dotenv';

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
  setUserToken(TOKEN);
  return createOrUpdate('post', payload);
};

export const updateProfile = (payload: IProfilePayload = {}) =>
  createOrUpdate('put', payload);

const createOrUpdate = (method: TMethod, payload: IProfilePayload = {}) => {
  payload.deviceInfo = deviceDetails();
  const api = create();
  return api.call(method, '/users', payload);
};
