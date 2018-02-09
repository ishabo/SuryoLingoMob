import { call, put } from 'redux-saga/effects';
import { getDictionaries } from '../api';
import { saveDictionaries } from '../actions';
import { setLoadingOn, setLoadingOff } from 'services/api/actions';
import * as exceptions from 'services/exceptions';
import * as dictionaries from 'services/dictionaries';
import { ISagasFunctions } from 'services/sagas';

export function* fetchDictionaries (action: dictionaries.IDictionaryAction): IterableIterator<any> {
  yield put(setLoadingOn());
  try {
    const response = yield call(getDictionaries, action.courseId);
    yield put(saveDictionaries(response));
  } catch (error) {
    yield put(exceptions.actions.add(error));
  }
  yield put(setLoadingOff());
}

export const functions = (): ISagasFunctions[] => {
  return [
    { action: dictionaries.actions.types.FETCH_DICTIONARIES, func: fetchDictionaries },
  ];
};
