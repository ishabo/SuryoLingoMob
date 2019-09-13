import { types } from '../actions';
export const initialState = { skillIcons: {}, courseImages: {} };
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_SKILL_ICONS:
            return Object.assign({}, state, { skillIcons: action.skillIcons });
        case types.SET_COURSE_IMAGES:
            return Object.assign({}, state, { courseImages: action.courseImages });
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map