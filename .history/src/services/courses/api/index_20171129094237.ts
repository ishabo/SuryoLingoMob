import { api } from '../../api';

export const getCourses = () => api.get('/courses');
