import { all, takeLatest } from 'redux-saga/effects';
import { fetchCourses } from './courses/sagas';
import { types as courseTypes } from './courses/actions';

export default function* rootSagas (): IterableIterator<any> {
  yield all([
    takeLatest(courseTypes.FETCH_COURSES, fetchCourses),
  ]);
}
