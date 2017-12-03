import { Store, Action } from 'redux';
import reducer from './reducer';
import * as actions from './actions';

export { getApplicationExceptions, getInvalidExceptions, getLatestException } from './reducer';

export interface IExceptionPayload {
  name: string;
  message: string;
  report: boolean;
  response: { [key: string]: any };
  action?: () => any;
}

export interface IException extends IExceptionPayload {
  id: number;
}

export interface IAddAction extends Action {
  payload: IExceptionPayload;
}

export interface IRemoveAction extends Action {
  id: number;
}

export interface IAction extends IAddAction, IRemoveAction { }

export interface IState {
  [key: number]: IException;
}

let crashReporter: any;
let store: Store<any>;

export const setCrashReporter = (newCrashReporter: any) => {
  crashReporter = newCrashReporter;
};

export const setStore = (newStore: Store<any>) => {
  store = newStore;
};

export const create = (payload: IExceptionPayload): IExceptionPayload => {
  if (payload.report && crashReporter) {
    crashReporter.logException(`${payload.name}: ${payload.message}`);
  }

  if (store) {
    store.dispatch(actions.add(payload));
  }

  return payload;
};

export {
  actions,
  reducer,
};
