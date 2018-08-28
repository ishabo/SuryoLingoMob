import { put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { getActiveCourse, canProceedToStudy } from 'services/selectors';
import { setLoadingOff } from 'services/api/actions';
import { fetchCourses } from 'services/courses/actions';
import { syncFinishedLessons } from 'services/progress/actions';
import { fetchSkills } from 'services/skills/actions';
import { ISagasFunctions } from 'services/sagas';
import * as starter from '../';
import * as exceptions from 'services/exceptions';
import { fetchProfile } from 'services/profile/sagas';
import { fetchSettings, checkStatus } from 'services/settings/actions';

export function* firstFetch(): IterableIterator<any> {
  yield put(exceptions.actions.removeAll());
  yield put(setLoadingOff());

  yield put(fetchSettings());
  yield delay(200);
  yield put(checkStatus());

  const canProceed = yield select(canProceedToStudy);
  if (!canProceed) {
    return;
  }

  yield call(fetchProfile);
  yield put(fetchCourses());
  yield delay(200);

  const activeCourse = yield select(getActiveCourse);

  if (activeCourse) {
    yield put(syncFinishedLessons());
    yield put(fetchSkills());
  }

  yield put(setLoadingOff());
}

export const functions = (): ISagasFunctions[] => {
  return [{ action: starter.actions.types.FIRST_FETCH, func: firstFetch }];
};
