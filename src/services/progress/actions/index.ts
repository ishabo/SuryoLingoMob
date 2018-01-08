const namespace = 'SuryoLingo/progress';
import { ILessonToSync } from '../';

export const types = {
  SET_LESSON_DONE: `${namespace}/SET_LESSON_DONE`,
  SYNC_FINISHED_LESSONS: `${namespace}/SYNC_FINISHED_LESSONS`,
  SET_LESSON_TO_SYNC: `${namespace}/SET_LESSON_TO_SYNC`,
  RESET_LESSONS_TO_SYNC: `${namespace}/RESET_LESSONS_TO_SYNC`,
  ENTER_LESSON: `${namespace}/ENTER_LESSON`,
  SET_LESSON_IN_PROGRESS: `${namespace}/SET_LESSON_IN_PROGRESS`,
  FINISH_LESSON: `${namespace}/FINISH_LESSON`,
};


export const enterLesson = (lessonId: string) => ({
  lessonId,
  type: types.ENTER_LESSON,
});

export const finishLesson = (lessonXP: number) => ({
  lessonXP,
  type: types.FINISH_LESSON,
});

export const setLessonInProgress = (lessonId: string | null) => ({
  lessonId,
  type: types.SET_LESSON_IN_PROGRESS,
});

export const syncFinishedLessons = () => ({
  type: types.SYNC_FINISHED_LESSONS,
});

export const setLessonToSync = (lessonToSync: ILessonToSync) => ({
  lessonToSync,
  type: types.SET_LESSON_TO_SYNC,
});

export const resetLessonsToSync = () => ({
  type: types.RESET_LESSONS_TO_SYNC,
});
