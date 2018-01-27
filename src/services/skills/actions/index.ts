import { ISkill } from 'services/skills';
import { Moment } from 'moment';

const namespace = 'SuryoLingo/Skills';

export const types = {
  SAVE_SKILLS: `${namespace}/SAVE_SKILLS`,
  FETCH_SKILLS: `${namespace}/FETCH_SKILLS`,
  ACTIVATE_UNIT: `${namespace}/ACTIVATE_UNIT`,
  MARK_LESSON_FINISHED: `${namespace}/MARK_LESSON_FINISHED`,
  RESET_SKILLS: `${namespace}/RESET_SKILLS`,
};

export const saveSkills = (payload: ISkill[]) => ({
  payload,
  type: types.SAVE_SKILLS,
});

export const fetchSkills = () => ({
  type: types.FETCH_SKILLS,
});

export const activateUnit = (unit: number) => ({
  unit,
  type: types.ACTIVATE_UNIT,
});

export const markLessonFinished = (lessonId: string, lessonXP: number, timestamp: Moment) => ({
  lessonId,
  lessonXP,
  timestamp,
  type: types.MARK_LESSON_FINISHED,
});

export const resetSkills = () => ({
  type: types.RESET_SKILLS,
});
