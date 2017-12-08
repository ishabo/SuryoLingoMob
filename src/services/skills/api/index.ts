import { create } from '../../api';

export const getSkills = (courseId) => {
  const api = create();
  return api.get(`/skills?course=${courseId}`);
};
