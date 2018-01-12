import { create } from 'services/api';

export const getSkills = (courseId: string) => {
  const api = create();
  return api.get(`/skills?course=${courseId}`);
};
