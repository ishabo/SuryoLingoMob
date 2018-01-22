// import { delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import * as courses from 'services/courses';
import * as skill from 'services/skills';
import * as dictionaries from 'services/dictionaries';
import { NavigationActions } from 'react-navigation';
import { setLoadingOn, setLoadingOff } from 'services/api/actions';
import * as profile from 'services/profile';
import { isRegistered } from 'services/selectors';
import { ISagasFunctions } from 'services/sagas';
// import RNRestart from 'react-native-restart';

export function* fetchCourses (): IterableIterator<any> {
  yield put(setLoadingOn());
  yield put(profile.actions.createProfile());
  const hasRegistered = yield select(isRegistered);
  try {
    const response = yield call(courses.api.getCourses);
    yield put(courses.actions.saveCourses(response));
    const routeName = hasRegistered ? 'Courses' : 'Signon';
    yield put(NavigationActions.navigate({ routeName }));
  } catch (error) {
    if (hasRegistered && typeof error === 'object' && error.response) {
      const { status } = error.response;
      if (status === 401 || status === 402) {
        yield put(profile.actions.resetProfile());
        // delay(100);
        // RNRestart.Restart();
      }
    }
    console.log(error);
  }

  yield put(setLoadingOff());
}

export function* switchCourse (action: courses.ICourseAction): IterableIterator<any> {
  yield put(courses.actions.setActiveCourse(action.courseId));
  yield put(dictionaries.actions.fetchDictionaries(action.courseId));
  yield put(skill.actions.fetchSkills());
}

export const functions = (): ISagasFunctions[] => {
  return [
    { action: courses.actions.types.FETCH_COURSES, func: fetchCourses },
    { action: courses.actions.types.SWITCH_COURSE, func: switchCourse },
  ];
};
