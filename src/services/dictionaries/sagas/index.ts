import { call, put } from 'redux-saga/effects';
import { getDictionaries } from '../api';
import { saveDictionaries } from '../actions';
import * as exceptions from 'services/exceptions';
import * as dictionaries from 'services/dictionaries';
import { ISagasFunctions } from 'services/sagas';

export function* fetchDictionaries(action: dictionaries.IDictionaryAction): IterableIterator<any> {
  try {
    const response = yield call(getDictionaries, action.courseId);
    yield put(saveDictionaries(response));
  } catch (error) {
    yield put(exceptions.actions.add(error));
  }
}

export const functions = (): ISagasFunctions[] => [
  { action: dictionaries.actions.types.FETCH_DICTIONARIES, func: fetchDictionaries }
];
