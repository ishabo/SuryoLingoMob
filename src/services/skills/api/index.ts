import { create } from '../../api';

export const getSkills = (courseId: string) => {
  const api = create();
  return api.get(`/skills?course=${courseId}`);
};
