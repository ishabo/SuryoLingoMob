import { put, select } from 'redux-saga/effects';
import { setActiveCourse, setLessonInProgress, setLessonDone } from '../actions';
import { IProgressAction } from '../reducers';
import { fetchSkills } from '../../skills/actions';
import { fetchQuestionsForLesson } from '../../questions/actions';
import { getLessonInProgress, getSkillInProgres } from '../../selectors';

export function* switchCourse(action: IProgressAction): IterableIterator<any> {
  yield put(setActiveCourse(action.courseId));
  yield put(fetchSkills(action.courseId));
}

export function* enterLesson(action: IProgressAction): IterableIterator<any> {
  yield put(setLessonInProgress(action.lessonId));
  yield put(fetchQuestionsForLesson(action.lessonId));
}

export function* finishLesson(action: IProgressAction): IterableIterator<any> {
  const { lessonXP } = action;
  const { id: lessonId } = yield select(getLessonInProgress);
  const skillId = yield select(getSkillInProgres);
  yield put(setLessonDone({ skillId, lessonId, lessonXP }));
}
