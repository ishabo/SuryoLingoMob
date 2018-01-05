import { call, put } from 'redux-saga/effects';
import { getDictionaries } from '../api';
import { saveDictionaries } from '../actions';
import { setLoadingOn, setLoadingOff } from 'services/api/actions';
import * as exceptions from 'services/exceptions';
import { IDictionaryAction } from 'services/dictionaries';

export function* fetchDictionaries(action: IDictionaryAction): IterableIterator<any> {
  yield put(setLoadingOn());
  try {
    const response = yield call(getDictionaries, action.courseId);
    yield put(saveDictionaries(response));
  } catch (error) {
    yield put(exceptions.actions.add(error));
  }
  yield put(setLoadingOff());
}
