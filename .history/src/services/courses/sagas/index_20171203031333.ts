import { call, put } from 'redux-saga/effects';
import { getCourses } from '../api';
import { saveCourses } from '../actions';

export default function* fetchCourses (): IterableIterator<any> {
  try {
    const response = yield call(getCourses);
    yield put(saveCourses(response.data));
  } catch (e) {
    console.error(e);
  }
}
