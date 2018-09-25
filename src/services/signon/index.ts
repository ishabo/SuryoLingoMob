import * as reducers from './reducers';
import * as actions from './actions';
import * as sagas from './sagas';
import * as api from './api';
import { IAction } from 'services/sagas';

export type TSignonType = string | 'signup' | 'signin';

export interface ISignonFormData {
  name?: string;
  viaFacebook?: boolean;
  email?: string;
  password?: string;
}

export type TSignonFacebookErrors = 'failedToLoginViaFacebook';

export interface ISignonFormErrors {
  name?: string;
  email?: string;
  password?: string;
  facebook?: TSignonFacebookErrors;
}

export interface ISignonState {
  item: ISignonFormData;
  errors: ISignonFormErrors;
}

export interface ISignonFormAction extends IAction {
  signon?: TSignonType;
  data?: ISignonFormData;
  errors?: ISignonFormData;
  email?: string;
}

export { api, sagas, actions, reducers };
