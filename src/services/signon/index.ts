import * as reducers from './reducers';
import * as actions from './actions';
import * as sagas from './sagas';
import * as api from './api';
import { IAction } from 'services/sagas';

export type TSignon = string | 'signup' | 'signin';

export interface ISignonFormData {
  name?: string;
  email: string;
  password: string;
}

export interface ISignonFormErrors {
  name?: string;
  email?: string;
  password?: string;
}

export interface ISignonState {
  item: ISignonFormData;
  errors: ISignonFormErrors;
}

export interface ISignonFormAction extends IAction {
  signon?: TSignon;
  data?: ISignonFormData;
  errors?: ISignonFormData;
  email?: string;
}

export { api, sagas, actions, reducers };
