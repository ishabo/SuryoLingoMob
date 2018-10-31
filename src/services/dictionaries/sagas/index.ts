import { call, put, select } from 'redux-saga/effects';
import { getDictionaries } from '../api';
import { saveDictionaries } from '../actions';
import * as dictionaries from 'services/dictionaries';
import { ISagasFunctions } from 'services/sagas';
import { getActiveCourse } from 'services/selectors';

export function* fetchDictionaries(action: dictionaries.IDictionaryAction): IterableIterator<any> {
  let activeCourseId = action.courseId;
  if (!activeCourseId) {
    const activeCourse = yield select(getActiveCourse);
    activeCourseId = activeCourse.id;
  }

  try {
    const response = yield call(getDictionaries, activeCourseId);
    yield put(saveDictionaries(response));
  } catch (e) {
    console.warn(e);
  }
}

export const functions = (): ISagasFunctions[] => [
  { action: dictionaries.actions.types.FETCH_DICTIONARIES, func: fetchDictionaries }
];
