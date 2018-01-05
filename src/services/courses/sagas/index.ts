import { call, put } from 'redux-saga/effects';
import * as courses from 'services/courses';
import * as skill from 'services/skills';
import * as dictionaries from 'services/dictionaries';
import * as exceptions from 'services/exceptions';
import { NavigationActions } from 'react-navigation';
import { setLoadingOn, setLoadingOff } from 'services/api/actions';

export function* fetchCourses(): IterableIterator<any> {
  yield put(setLoadingOn());
  try {
    const response = yield call(courses.api.getCourses);
    yield put(courses.actions.saveCourses(response));
    yield put(NavigationActions.navigate({ routeName: 'Courses' }));
  } catch (error) {
    yield put(exceptions.actions.add(error));
  }
  yield put(setLoadingOff());
}

export function* switchCourse(action: courses.ICourseAction): IterableIterator<any> {
  yield put(courses.actions.setActiveCourse(action.courseId));
  yield put(dictionaries.actions.fetchDictionaries(action.courseId));
  yield put(skill.actions.fetchSkills(action.courseId));
}
