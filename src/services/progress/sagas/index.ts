import { delay } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import * as progress from 'services/progress';
import * as questions from 'services/questions';
import {
  getLessonInProgress, getSkillsByUnit,
  getSkillInProgress, getActiveCourse,
  getLessonsToSync,
} from 'services/selectors';

import { setLessonInProgress } from '../actions';
import * as skills from 'services/skills';
// import * as exceptions from 'services/exceptions';
import moment from 'moment';

export function* enterLesson (action: progress.IProgressAction): IterableIterator<any> {
  yield put(setLessonInProgress(action.lessonId));
  yield put(questions.actions.fetchQuestionsForLesson(action.lessonId));
}

export function* finishLesson (action: progress.IProgressAction): IterableIterator<any> {
  const { lessonXP } = action;
  const { id: lessonId } = yield select(getLessonInProgress);
  const course = yield select(getActiveCourse);
  const skillInProgress = yield select(getSkillInProgress);
  const skillsOfUnit = yield select(getSkillsByUnit(skillInProgress.unit));
  const timestamp = moment();
  yield put(skills.actions.markLessonFinished(lessonId, lessonXP, timestamp));
  yield put(progress.actions.setLessonToSync({
    lessonId,
    lessonXP,
    skillId: skillInProgress.id,
    courseId: course.id,
    createdAt: timestamp,
  }));

  if (isUnitFinished(skillsOfUnit)) {
    yield put(skills.actions.activateUnit(skillInProgress.unit));
  }

  yield delay(1000);
  yield put(progress.actions.syncFinishedLessons());
}

export function* syncFinishedLessons (): IterableIterator<any> {
  const lessonsToSync = yield select(getLessonsToSync);
  try {
    yield call(progress.api.syncFinishedLessons, lessonsToSync);
    yield put(progress.actions.resetLessonsToSync());
  } catch (error) {
    // yield put(exceptions.actions.add(error));
    console.warn(error);
  }
}

const isUnitFinished = (skills: skills.ISkill[]): boolean => {
  let skill: skills.ISkill;
  for (skill of skills) {
    if (skill.progress !== 1) { // progress 1 means all lessons are passed. 
      return false;
    }
  }
  return true;
};
