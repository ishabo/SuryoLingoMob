import { create } from 'services/api';

export const getSkillIcons = () => {
  const api = create();
  return api.get('/assets?what=skill_icons');
};
