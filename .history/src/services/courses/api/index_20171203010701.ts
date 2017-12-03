import { create } from '../../api';

export const getCourses = () => {
  const api = create();
  return api.get('/courses');
}
