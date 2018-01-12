import * as reducers from './reducers';
import * as actions from './actions';
import * as sagas from './sagas';
import * as api from './api';

export type TSignon = string | 'signup' | 'signin';

export interface ISignonFormData {
  name?: string;
  email?: string;
  password?: string;
}

export interface ISignonState {
  item: ISignonFormData;
  errors: ISignonFormData;
}

export interface ISignonFormAction {
  type: string;
  signon?: TSignon;
  data?: ISignonFormData;
  errors?: ISignonFormData;
}

export {
  api,
  sagas,
  actions,
  reducers,
};
