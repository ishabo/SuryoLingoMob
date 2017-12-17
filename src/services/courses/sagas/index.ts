import { call, put } from 'redux-saga/effects';
import { getCourses } from '../api';
import { saveCourses } from '../actions';
import { NavigationActions } from 'react-navigation';

export function* fetchCourses(): IterableIterator<any> {
  try {
    const response = yield call(getCourses);
    yield put(saveCourses(response));
  } catch (e) {
    // TODO: perhaps have a hard coded list of courses to 
    // prevent getting stuck at the splash screen?
    console.error(e);
  }

  yield put(NavigationActions.navigate({ routeName: 'Courses' }));
}
