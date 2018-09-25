import { put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { NavigationActions } from 'react-navigation';

import { getActiveCourse, isRegistered, canProceedToStudy } from 'services/selectors';
import { setLoadingOff } from 'services/api/actions';
import { fetchCourses } from 'services/courses/actions';
import { syncFinishedLessons } from 'services/progress/actions';
import { fetchSkills } from 'services/skills/actions';
import { ISagasFunctions } from 'services/sagas';
import * as starter from '../';
import * as exceptions from 'services/exceptions';
import { fetchProfile } from 'services/profile/sagas';
import { fetchSettings, checkStatus } from 'services/settings/actions';
import * as profile from 'services/profile';
import * as signon from 'services/signon';
import { navToSkills, resetToCourses, logError } from 'helpers';

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

  yield put(profile.actions.createProfileIfNeeded());

  yield delay(200);
  yield call(fetchProfile);

  const hasRegistered = yield select(isRegistered);

  try {
    yield put(fetchCourses());

    yield delay(100);

    if (yield select(getActiveCourse)) {
      navToSkills();
    } else {
      if (hasRegistered) {
        yield put(resetToCourses());
      } else {
        yield put(NavigationActions.navigate({ routeName: 'Signon' }));
      }
    }
  } catch (error) {
    if (hasRegistered && typeof error === 'object' && error.response) {
      const { status } = error.response;
      if (status === 401 || status === 402) {
        yield put(signon.actions.signout());
        return;
      }
    }

    logError(JSON.stringify(error));
  }

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
