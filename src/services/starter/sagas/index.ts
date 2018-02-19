import { put, select } from 'redux-saga/effects';
import { getActiveCourse } from 'services/selectors';
import { setLoadingOff } from 'services/api/actions';
import { fetchCourses } from 'services/courses/actions';
import { syncFinishedLessons } from 'services/progress/actions';
import { fetchSkills } from 'services/skills/actions';
import { ISagasFunctions } from 'services/sagas';
import * as starter from '../';

export function* firstFetch (): IterableIterator<any> {
  const activeCourse = yield select(getActiveCourse);
  yield put(setLoadingOff());
  yield put(fetchCourses());

  if (activeCourse) {
    yield put(syncFinishedLessons());
    yield put(fetchSkills());
  }
}

export const functions = (): ISagasFunctions[] => {
  return [
    { action: starter.actions.types.FIRST_FETCH, func: firstFetch },
  ];
};
