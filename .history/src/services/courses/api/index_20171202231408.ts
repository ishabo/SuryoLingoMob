import { create } from '../../api';

export const getCourses = () => api.create().get('/courses');
