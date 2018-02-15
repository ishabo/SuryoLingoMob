import { IAssets } from '../';

const namespace = 'SuryoLingo/assets';

export const types = {
  SET_SKILL_ICONS: `${namespace}/SET_SKILL_ICONS`,
  FETCH_SKILL_ICONS: `${namespace}/FETCH_SKILL_ICONS`,
};

export const setSkillIcons = (skillIcons: IAssets['skillIcons']) => ({
  skillIcons,
  type: types.SET_SKILL_ICONS,
});

export const fetchSkillIcons = () => ({
  type: types.FETCH_SKILL_ICONS,
});
