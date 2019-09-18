import * as api from './api';
import * as sagas from './sagas';
import * as actions from './actions';
import * as reducers from './reducers';
import { IAction } from '@sl/services/sagas';

export interface IDeviceSettings {
  version: string;
  update: {
    force: boolean;
    since: string;
  };
}

export interface IMaintenance {
  switchedOn: boolean;
  showDefaultMessage: boolean;
  message: {
    [key: string]: string;
  };
}

export interface IAppSettings {
  maintenance?: IMaintenance;
  android?: IDeviceSettings;
  ios?: IDeviceSettings;
}

export interface IAppSettingsAction extends IAction {
  settings?: IAppSettings;
}

export { api, sagas, actions, reducers };
