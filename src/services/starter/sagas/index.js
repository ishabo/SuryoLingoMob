import { put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { getActiveCourse, isRegistered, canProceedToStudy } from 'services/selectors';
import { setLoadingOff } from 'services/api/actions';
import { fetchCourses } from 'services/courses/actions';
import { syncFinishedLessons } from 'services/progress/actions';
import { fetchSkills } from 'services/skills/actions';
import { fetchSettings, checkStatus } from 'services/settings/actions';
import { createProfileIfNeeded } from 'services/profile/actions';
import * as signon from 'services/signon';
import * as starter from '../';
import * as exceptions from 'services/exceptions';
import { resetToCourses, logError, resetToSkills, navToSignon } from 'helpers';
import { isEmpty } from 'lodash';
export function* onAppStart() {
    yield put(exceptions.actions.removeAll());
    yield put(setLoadingOff());
}
export function* firstFetch(actions) {
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
            const profileState = yield select((state) => state.profile);
            if (isEmpty(profileState)) {
                yield call(firstFetch, { checkSettings: false });
                return;
            }
        }
        catch (error) {
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
    }
    else {
        if (yield select(isRegistered)) {
            yield put(resetToCourses());
        }
        else {
            yield put(navToSignon());
        }
    }
    yield put(setLoadingOff());
}
export const functions = () => {
    const types = starter.actions.types;
    return [{ action: types.FIRST_FETCH, func: firstFetch }, { action: types.ON_APP_START, func: onAppStart }];
};
//# sourceMappingURL=index.js.map