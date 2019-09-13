const namespace = 'SuryoLingo/courses';
export const types = {
    SAVE_COURSES: `${namespace}/SAVE_COURSES`,
    FETCH_COURSES: `${namespace}/FETCH_COURSES`,
    ENROLL_IN_COURSE: `${namespace}/ENROLL_IN_COURSE`,
    SWITCH_COURSE: `${namespace}/SWITCH_COURSE`,
    SET_COURSE_ACTIVE: `${namespace}/SET_COURSE_ACTIVE`,
    RESET_COURSES: `${namespace}/RESET_COURSES`,
};
export const saveCourses = (courses) => ({
    courses,
    type: types.SAVE_COURSES,
});
export const fetchCourses = () => ({
    type: types.FETCH_COURSES,
});
export const enrollInCourse = (courseId) => ({
    courseId,
    type: types.ENROLL_IN_COURSE,
});
export const switchCourse = (courseId) => ({
    courseId,
    type: types.SWITCH_COURSE,
});
export const setActiveCourse = (courseId) => ({
    courseId,
    type: types.SET_COURSE_ACTIVE,
});
export const resetCourses = () => ({
    type: types.RESET_COURSES,
});
//# sourceMappingURL=index.js.map