import { delay } from 'redux-saga'
import { put, select } from 'redux-saga/effects';
import { IProgressAction } from '../reducers';
import { markLessonFinished, activateUnit } from '../../skills/actions';
import { fetchQuestionsForLesson } from '../../questions/actions';
import {
  getLessonInProgress, getSkillsByUnit,
  getSkillInProgress, getActiveCourse,
} from '../../selectors';
import { setLessonInProgress } from '../actions';
import { ISkill } from '../../skills/reducers';
import { NavigationActions } from 'react-navigation';
import { ICourse } from '../../courses/reducers';
import { navToSkills } from '../../../helpers';
export function* enterLesson(action: IProgressAction): IterableIterator<any> {
  yield put(setLessonInProgress(action.lessonId));
  yield put(fetchQuestionsForLesson(action.lessonId));
}

const resetAction = (course: ICourse, skill: ISkill) => NavigationActions.reset({
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

export function* finishLesson(action: IProgressAction): IterableIterator<any> {
  const { lessonXP } = action;
  const { id: lessonId } = yield select(getLessonInProgress);
  const course = yield select(getActiveCourse);
  const skill = yield select(getSkillInProgress);
  const skillsOfUnit = yield select(getSkillsByUnit(skill.unit));
  yield put(markLessonFinished(lessonId, lessonXP));

  if (isUnitFinished(skillsOfUnit)) {
    yield put(activateUnit(skill.unit));
  }

  yield delay(1000);
  yield put(NavigationActions.reset(resetAction(course, skill)));
}

const isUnitFinished = (skills: ISkill[]): boolean => {
  let skill: ISkill;
  for (skill of skills) {
    if (skill.progress !== 1) { // progress 1 means all lessons are passed. 
      return false;
    }
  }
  return true;
};
