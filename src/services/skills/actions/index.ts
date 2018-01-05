import { ISkill } from 'services/skills';

const namespace = 'SuryoLingo/Skills';

export const types = {
  SAVE_SKILLS: `${namespace}/SAVE_SKILLS`,
  FETCH_SKILLS: `${namespace}/FETCH_SKILLS`,
  ACTIVATE_UNIT: `${namespace}/ACTIVATE_UNIT`,
  MARK_LESSON_FINISHED: `${namespace}/MARK_LESSON_FINISHED`,

};

export const saveSkills = (payload: ISkill[]) => ({
  payload,
  type: types.SAVE_SKILLS,
});

export const fetchSkills = (courseId: string) => ({
  courseId,
  type: types.FETCH_SKILLS,
});

export const activateUnit = (unit: number) => ({
  unit,
  type: types.ACTIVATE_UNIT,
});

export const markLessonFinished = (lessonId: string, lessonXP: number) => ({
  lessonId,
  lessonXP,
  type: types.MARK_LESSON_FINISHED,
});
