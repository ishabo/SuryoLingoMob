import { IProgress } from '../reducers';

const namespace = 'SuryoLingo/progress';
export const types = {
  SET_PROGRESS: `${namespace}/SET_PROGRESS`,
  ENROLE_COURSE: `${namespace}/ENROLE_COURSE`,
  SET_ACTIVE_COUTSE: `${namespace}/SET_ACTIVE_COUTSE`,
  SET_LESSON_DONE: `${namespace}/SET_LESSON_DONE`,
  SET_MODULE_DONE: `${namespace}/SET_MODULE_DONE`,
  ADD_XP: `${namespace}/ADD_XP`,
};

export const setProgress = (payload: IProgress) => ({
  payload,
  type: types.SET_PROGRESS,
});

export const enroleCourse = (courseId: string) => ({
  courseId,
  type: types.ENROLE_COURSE,
});

export const setActiveCourse = (courseId: string) => ({
  courseId,
  type: types.SET_ACTIVE_COUTSE,
});

export const setLessonDone = (lessonId: string) => ({
  lessonId,
  type: types.SET_LESSON_DONE,
});

export const setModuleDone = (moduleId: string) => ({
  moduleId,
  type: types.SET_MODULE_DONE,
});

export const addXP = (xp: number) => ({
  xp,
  type: types.ADD_XP,
});
