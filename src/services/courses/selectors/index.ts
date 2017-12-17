import { ICourse } from '../reducers';

export const getActiveCourse = (state: ICourse[], courseId: string): ICourse =>
    state.filter((course: ICourse) => course.id === courseId)[0];
