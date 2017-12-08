import { ISkill } from '../reducers';

const namespace = 'SuryoLingo/Skills';

export const types = {
  SAVE_SKILLS: `${namespace}/SAVE_SKILLS`,
  FETCH_SKILLS: `${namespace}/FETCH_SKILLS`,
};

export const saveSkills = (payload: ISkill[]) => ({
  payload,
  type: types.SAVE_SKILLS,
});

export const fetchSkills = (courseId: string) => ({
  courseId,
  type: types.FETCH_SKILLS,
});
