import { create } from '../../api';

const api = create();
export const getCourses = () => api.get('/courses');
