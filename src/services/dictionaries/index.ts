import * as reducers from './reducers';
import * as actions from './actions';
import * as sagas from './sagas';

export interface IDictionary {
  id: string;
  word: string;
  translatinos: string;
}

export interface IDictionaryAction {
  type: string;
  courseId: string;
  dictionaries: IDictionary[];
}

export {
  actions,
  reducers,
  sagas,
};
