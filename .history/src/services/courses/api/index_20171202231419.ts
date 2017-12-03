import { create } from '../../api';

export const getCourses = () => create().get('/courses');
