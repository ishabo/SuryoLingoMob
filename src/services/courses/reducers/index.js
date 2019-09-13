import { types } from '../actions';
import cloneDeep from 'clone-deep';
export const initialState = [];
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_COURSES:
            return action.courses;
        case types.ENROLL_IN_COURSE:
            return cloneDeep(state).map((course) => {
                if (course.id === action.courseId) {
                    course.enrolled = true;
                }
                return course;
            });
        case types.SET_COURSE_ACTIVE:
            return cloneDeep(state).map((course) => {
                course.active = (course.id === action.courseId);
                return course;
            });
        case types.RESET_COURSES:
            return initialState;
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map