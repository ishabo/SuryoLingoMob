const namespace = 'SuryoLingo/progress';
export const types = {
  SET_LESSON_DONE: `${namespace}/SET_LESSON_DONE`,
  SYNC_PROGRESS: `${namespace}/SYNC_PROGRESS`,
  ENTER_LESSON: `${namespace}/ENTER_LESSON`,
  SET_LESSON_IN_PROGRESS: `${namespace}/SET_LESSON_IN_PROGRESS`,
  FINISH_LESSON: `${namespace}/FINISH_LESSON`,
};

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
