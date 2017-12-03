import { call, put } from 'redux-saga/effects';
import { getCourses } from '../api';
import { saveCourses } from '../actions';

export default function* fetchCourses (): IterableIterator<any> {
  const courses = yield call(getCourses);
  put(saveCourses(courses));
}
