import { ICourse } from '../reducers';

const namespace = 'SuryoLingo/courses';

export const types = {
  SAVE_COURSES: `${namespace}/SAVE_COURSES`,
  FETCH_COURSES: `${namespace}/FETCH_COURSES`,
  ENROLL_IN_COURSE: `${namespace}/ENROLL_IN_COURSE`,
  SWITCH_COURSE: `${namespace}/SWITCH_COURSE`,
  SET_COURSE_ACTIVE: `${namespace}/SET_COURSE_ACTIVE`,
};

export const saveCourses = (courses: ICourse[]) => ({
  courses,
  type: types.SAVE_COURSES,
});

export const fetchCourses = () => ({
  type: types.FETCH_COURSES,
});

export const enrollInCourse = (courseId: string) => ({
  courseId,
  type: types.ENROLL_IN_COURSE,
});

export const switchCourse = (courseId: string) => ({
  courseId,
  type: types.SWITCH_COURSE,
});

export const setActiveCourse = (courseId: string) => ({
  courseId,
  type: types.SET_COURSE_ACTIVE,
});

