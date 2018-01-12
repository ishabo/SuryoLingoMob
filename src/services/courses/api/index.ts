import { create } from 'services/api';

export const getCourses = () => {
  const api = create();
  return api.get('/courses');
};
