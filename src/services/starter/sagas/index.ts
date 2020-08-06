import { put, call, select, delay } from 'redux-saga/effects';
import {
  getActiveCourse,
  isRegistered,
  canProceedToStudy
} from '@sl/services/selectors';
import { setLoadingOff } from '@sl/services/api/actions';
import { fetchCourses } from '@sl/services/courses/actions';
import { syncFinishedLessons } from '@sl/services/progress/actions';
import { fetchSkills } from '@sl/services/skills/actions';
import { ISagasFunctions } from '@sl/services/sagas';
import { fetchSettings, checkStatus } from '@sl/services/settings/actions';
import { createProfileIfNeeded } from '@sl/services/profile/actions';
import * as signon from '@sl/services/signon';
import * as starter from '../';
import * as exceptions from '@sl/services/exceptions';
import {
  resetToCourses,
  logError,
  resetToSkills,
  navToSignon
} from '@sl/helpers';
import { isEmpty } from 'lodash';
import { IInitialState } from '@sl/services/reducers';

export function* onAppStart(): IterableIterator<any> {
  yield put(exceptions.actions.removeAll());
  yield put(setLoadingOff());
}

export function* firstFetch(
  actions: starter.IStarterActions
): IterableIterator<any> {
  yield put(starter.actions.onAppStart());

  if (actions.checkSettings) {
    yield put(fetchSettings());
    yield delay(200);
    yield put(checkStatus());

    const canProceed = yield select(canProceedToStudy);

    if (!canProceed) {
      return;
    }

    try {
      yield put(createProfileIfNeeded());

      yield delay(500);
      const profileState = yield select(
        (state: IInitialState) => state.profile
      );
      if (isEmpty(profileState)) {
        yield call(firstFetch, { checkSettings: false });
        return;
      }
    } catch (error) {
      if (typeof error === 'object' && error.response) {
        const { status } = error.response;
        if (status === 401 || status === 402) {
          yield put(signon.actions.signout());
          return;
        }
      }

      logError(JSON.stringify(error));
    }
  }

  yield put(fetchCourses());
  yield delay(500);

  if (yield select(getActiveCourse)) {
    yield put(syncFinishedLessons());
    yield put(fetchSkills());
    yield put(resetToSkills());
  } else {
    if (yield select(isRegistered)) {
      yield put(resetToCourses());
    } else {
      yield put(navToSignon());
    }
  }

  yield put(setLoadingOff());
}

export const functions = (): ISagasFunctions[] => {
  const types = starter.actions.types;
  return [
    { action: types.FIRST_FETCH, func: firstFetch },
    { action: types.ON_APP_START, func: onAppStart }
  ];
};
