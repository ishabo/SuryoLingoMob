import { create } from '@sl/services/api';

export const getCourses = () => {
  const api = create();
  return api.get('/courses');
};
