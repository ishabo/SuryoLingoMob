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
  payload?: IProfilePayload;
  courseId: ICourse['id'];
}

export interface IProfilePayload {
  name?: string;
  email?: string;
  password?: string;
}

export {
  api,
  sagas,
  actions,
  reducers,
};
