import { all, takeLatest } from 'redux-saga/effects';
import fetchCourses from './courses/sagas';
import switchCourse from './progress/sagas';
import fetchSkills from './skills/sagas';

import { types as courseTypes } from './courses/actions';
import { types as progressTypes } from './progress/actions';
import { types as skillTypes } from './skills/actions';

export default function* rootSagas (): IterableIterator<any> {
  yield all([
    takeLatest(courseTypes.FETCH_COURSES, fetchCourses),
    takeLatest(progressTypes.SWITCH_COURSE, switchCourse),
    takeLatest(skillTypes.FETCH_SKILLS, fetchSkills),
  ]);
}
