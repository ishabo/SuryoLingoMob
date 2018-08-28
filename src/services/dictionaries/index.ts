import * as reducers from './reducers';
import * as actions from './actions';
import * as sagas from './sagas';
import { IAction } from 'services/sagas';

export interface IWordHint {
  word: string;
  translations?: string;
  key?: string;
}

export interface IDictionary {
  id: string;
  word: string;
  translations: string;
}

export interface IDictionaryAction extends IAction {
  courseId: string;
  dictionaries: IDictionary[];
}

export { actions, reducers, sagas };
