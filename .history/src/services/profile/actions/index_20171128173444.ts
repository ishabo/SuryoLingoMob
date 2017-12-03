import { ICourse } from '../reducers';

export const types = {
  SAVE_COURSES: 'courses/SAVE_COURSES',
  FETCH_COURSES: 'courses/FETCH_COURSES',
};

export const saveCourses = (payload: ICourse[]) => ({
  payload,
  type: types.SAVE_COURSES,
});
