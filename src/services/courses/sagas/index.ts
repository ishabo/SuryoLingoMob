import { call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import * as courses from 'services/courses';
import * as skill from 'services/skills';
import { NavigationActions } from 'react-navigation';
import { setLoadingOn, setLoadingOff } from 'services/api/actions';
import * as profile from 'services/profile';
import * as signon from 'services/signon';
import * as assets from 'services/assets';
import { isRegistered, getActiveCourse } from 'services/selectors';
import { ISagasFunctions } from 'services/sagas';
import { navToSkills } from 'helpers';

export function* fetchCourses(): IterableIterator<any> {
  yield put(setLoadingOn());
  yield put(profile.actions.createProfile());
  const hasRegistered = yield select(isRegistered);
  const activeCourse = yield select(getActiveCourse);

  try {
    const response = yield call(courses.api.getCourses);
    yield put(courses.actions.saveCourses(response));
    yield put(assets.actions.fetchCourseImages());
    if (activeCourse) {
      navToSkills();
    } else {
      const routeName = hasRegistered ? 'Courses' : 'Signon';
      yield put(NavigationActions.navigate({ routeName }));
    }
  } catch (error) {
    if (hasRegistered && typeof error === 'object' && error.response) {
      const { status } = error.response;
      if (status === 401 || status === 402) {
        yield put(signon.actions.signout());
      }
    }
    console.log(error);
  }
  yield put(setLoadingOff());
}

export function* switchCourse(action: courses.ICourseAction): IterableIterator<any> {
  yield delay(1000);
  yield put(courses.actions.setActiveCourse(action.courseId));
  yield put(skill.actions.fetchSkills());
}

export const functions = (): ISagasFunctions[] => {
  return [
    { action: courses.actions.types.FETCH_COURSES, func: fetchCourses },
    { action: courses.actions.types.SWITCH_COURSE, func: switchCourse }
  ];
};
