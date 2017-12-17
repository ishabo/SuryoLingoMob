import { IProgressAction } from '../reducers';

const namespace = 'SuryoLingo/progress';
export const types = {
  SWITCH_COURSE: `${namespace}/SWITCH_COURSE`,
  SET_ACTIVE_COUTSE: `${namespace}/SET_ACTIVE_COUTSE`,
  SET_LESSON_DONE: `${namespace}/SET_LESSON_DONE`,
  SET_SKILL_IN_ROGRESS: `${namespace}/SET_SKILL_IN_ROGRESS`,
  ADD_XP: `${namespace}/ADD_XP`,
  SYNC_PROGRESS: `${namespace}/SYNC_PROGRESS`,
  ENTER_LESSON: `${namespace}/ENTER_LESSON`,
  SET_LESSON_IN_PROGRESS: `${namespace}/SET_LESSON_IN_PROGRESS`,
  FINISH_LESSON: `${namespace}/FINISH_LESSON`,
};

export interface ILessonDoneParams {
  lessonId: string;
  lessonXP: number;
}

export const switchCourse = (courseId: string) => ({
  courseId,
  type: types.SWITCH_COURSE,
});

export const setActiveCourse = (courseId: string) => ({
  courseId,
  type: types.SET_ACTIVE_COUTSE,
});

export const setLessonDone = ({ skillId, lessonId, lessonXP }: Partial<IProgressAction>) => ({
  skillId,
  lessonId,
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

export const syncProgress = () => ({
  type: types.SYNC_PROGRESS,
});

export const setLessonInProgress = (lessonId: string | null) => ({
  lessonId,
  type: types.SET_LESSON_IN_PROGRESS,
});

export const enterLesson = (lessonId: string) => ({
  lessonId,
  type: types.ENTER_LESSON,
});

export const finishLesson = (lessonXP: number) => ({
  lessonXP,
  type: types.FINISH_LESSON,
});
