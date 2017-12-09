import { IProgress } from '../reducers';

const namespace = 'SuryoLingo/progress';
export const types = {
  SWITCH_COURSE: `${namespace}/SWITCH_COURSE`,
  SET_ACTIVE_COUTSE: `${namespace}/SET_ACTIVE_COUTSE`,
  SET_LESSON_DONE: `${namespace}/SET_LESSON_DONE`,
  SET_SKILL_IN_ROGRESS: `${namespace}/SET_SKILL_IN_ROGRESS`,
  ADD_XP: `${namespace}/ADD_XP`,
};

export const switchCourse = (courseId: string) => ({
  courseId,
  type: types.SWITCH_COURSE,
});

export const setActiveCourse = (courseId: string) => ({
  courseId,
  type: types.SET_ACTIVE_COUTSE,
});

export const setLessonDone = (skillId: string, lessonId: string, lessonXP: number) => ({
  lessonId,
  skillId,
  lessonXP,
  type: types.SET_LESSON_DONE,
});

export const setSkillInProgress = (skillId: string) => ({
  skillId,
  type: types.SET_SKILL_IN_ROGRESS,
});

export const addXP = (xp: number) => ({
  xp,
  type: types.ADD_XP,
});
