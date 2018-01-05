import * as course from '../actions';
import courses from 'data/dummy/courses';

describe('courses actions', () => {
  const { types } = course;
  describe('saveCourses', () => {
    it('renders type SAVE_COURSES with payload', () => {
      expect(course.saveCourses(courses)).toEqual({
        courses,
        type: types.SAVE_COURSES,
      });
    });
  });

  // describe('fetchCourse', () => {
  //   it('renders type FETCH_COURSES', () => {
  //     expect(course.fetchCourses()).toEqual({
  //       type: types.FETCH_COURSES,
  //     });
  //   });
  // });

  describe('enrollInCourse', () => {
    it('renders type ENROLL_IN_COURSE with courseId', () => {
      expect(course.enrollInCourse('course-1')).toEqual({
        courseId: 'course-1',
        type: types.ENROLL_IN_COURSE,
      });
    });
  });

  describe('switchCourse', () => {
    it('renders type SWITCH_COURSE with courseId', () => {
      expect(course.switchCourse('course-1')).toEqual({
        courseId: 'course-1',
        type: types.SWITCH_COURSE,
      });
    });
  });

  describe('switchCourse', () => {
    it('renders type SET_COURSE_ACTIVE with courseId', () => {
      expect(course.setActiveCourse('course-1')).toEqual({
        courseId: 'course-1',
        type: types.SET_COURSE_ACTIVE,
      });
    });
  });
});
