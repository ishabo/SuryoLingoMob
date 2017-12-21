import { all, takeLatest } from 'redux-saga/effects';
import { fetchCourses, switchCourse } from './courses/sagas';
import { fetchSkills } from './skills/sagas';
import { enterLesson, finishLesson } from './progress/sagas';
import { fetchQuestions, nextQuestionOrFinish } from './questions/sagas';

import { types as courseTypes } from './courses/actions';
import { types as skillTypes } from './skills/actions';
import { types as questionTypes } from './questions/actions';
import { types as progressTypes } from './progress/actions';

export default function* rootSagas(): IterableIterator<any> {
  yield all([
    takeLatest(courseTypes.FETCH_COURSES, fetchCourses),
    takeLatest(courseTypes.SWITCH_COURSE, switchCourse),
    takeLatest(progressTypes.ENTER_LESSON, enterLesson),
    takeLatest(progressTypes.FINISH_LESSON, finishLesson),
    takeLatest(skillTypes.FETCH_SKILLS, fetchSkills),
    takeLatest(questionTypes.FETCH_QUESTIONS, fetchQuestions),
    takeLatest(questionTypes.NEXT_QUESTION_OR_FINISH, nextQuestionOrFinish),
  ]);
}
