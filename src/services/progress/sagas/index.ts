import { delay } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import { IProgressAction } from 'services/progress';
import * as questions from 'services/questions';
import {
  getLessonInProgress, getSkillsByUnit,
  getSkillInProgress, getActiveCourse,
} from 'services/selectors';

import { setLessonInProgress } from '../actions';
import * as skill from '../../skills';
import { NavigationActions } from 'react-navigation';
import { ICourse } from '../../courses';
import { navToSkills } from 'helpers';

export function* enterLesson(action: IProgressAction): IterableIterator<any> {
  yield put(setLessonInProgress(action.lessonId));
  yield put(questions.actions.fetchQuestionsForLesson(action.lessonId));
}

export function* finishLesson(action: IProgressAction): IterableIterator<any> {
  const { lessonXP } = action;
  const { id: lessonId } = yield select(getLessonInProgress);
  const course = yield select(getActiveCourse);
  const skill = yield select(getSkillInProgress);
  const skillsOfUnit = yield select(getSkillsByUnit(skill.unit));
  yield put(skill.actions.markLessonFinished(lessonId, lessonXP));

  if (isUnitFinished(skillsOfUnit)) {
    yield put(skill.actions.activateUnit(skill.unit));
  }

  yield delay(1000);
  yield put(NavigationActions.reset(resetAction(course, skill)));
}

const resetAction = (course: ICourse, skill: skill.ISkill) => NavigationActions.reset({
  index: 1,
  key: null,
  actions: [
    navToSkills(course),
    NavigationActions.navigate({
      routeName: 'Lessons',
      params: { skill },
    }),
  ],
});

const isUnitFinished = (skills: skill.ISkill[]): boolean => {
  let skill: skill.ISkill;
  for (skill of skills) {
    if (skill.progress !== 1) { // progress 1 means all lessons are passed. 
      return false;
    }
  }
  return true;
};
