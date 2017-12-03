import { ICourse } from '../reducers';

const namespace = 'SuryoLingo/courses';

export const types = {
  SAVE_COURSES: `${namespace}/SAVE_COURSES`,
  FETCH_COURSES: `${namespace}/FETCH_COURSES`,
};

export const saveCourses = (payload: ICourse[]) => ({
  payload,
  type: types.SAVE_COURSES,
});

export const fetchCourses = () => ({
  type: types.FETCH_COURSES,
});
