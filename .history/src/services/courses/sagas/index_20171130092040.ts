import { call, put } from 'redux-saga/effects';
import { getCourses } from '../api';
import { saveCourses } from '../actions';

export default function* fetchCourses (): IterableIterator<any> {
  try {
    const response = yield call(getCourses);
    switch (response.status) {
      case 200:
        put(saveCourses(response.data));
        break;
      default:
        console.error(response);
    }
  } catch (e) {
    console.error(e);
  }
}
