import * as reducers from './reducers';
import * as actions from './actions';
import * as sagas from './sagas';
import * as api from './api';

import { ICourse } from 'services/courses';

export interface IProfile {
  id?: string;
  name?: string;
  email?: string;
  userXP?: number;
}

export interface IProfileAction {
  type: string;
  payload?: IFetchedProfileData;
  data?: IProfile;
  courseId: ICourse['id'];
}

export interface IDeviceInfo {
  deviceId: string;
  deviceName: string;
  appVersion: string;
  phoneModel: string;
  deviceLocale: string;
  deviceCountry: string;
  timeZone: string;
  apiLevel?: number;
  firstInstallTime: number;
  lastUpdateTime: number;
}

export interface IProfilePayload {
  name?: string;
  email?: string;
  password?: string;
  deviceInfo?: IDeviceInfo;
}

export interface IFetchedProfileData extends IProfile {
  apiKey?: string;
}

export {
  api,
  sagas,
  actions,
  reducers,
};
