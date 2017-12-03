import { call, put } from 'redux-saga/effects';
import { getCourses } from '../api';
import { saveCourses } from '../actions';

export default function* fetchCourses (): IterableIterator<any> {
  try {
    const response = yield call(getCourses);
    debugger;
    switch (response.status) {
      case 200:
        put(saveCourses(response.data));
      default:
        console.log(response);
    }
  } catch (e) {
    console.error(e);
  }
}
