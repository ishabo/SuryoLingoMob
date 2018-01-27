import * as reducers from './reducers';
import * as actions from './actions';
import * as sagas from './sagas';
import * as api from './api';

import { ICourse } from 'services/courses';
export type TSignon = string | 'signup' | 'signin';

export interface IProfile {
  id?: string;
  name?: string;
  email?: string;
  userXP?: number;
  deviceId?: string;
}

export interface ISignonFormData {
  name?: string;
  email: string;
  password: string;
}

export interface IProfileAction {
  type: string;
  profileData?: IFetchedProfileData;
  payload?: IProfileSignonPayload;
  data?: IProfile;
  courseId: ICourse['id'];
  signon?: TSignon;
  formData?: ISignonFormData;
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

export interface IProfileSignonPayload extends IProfilePayload {
  email: string;
  password: string;
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
