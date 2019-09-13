import { types } from '../actions';
export const initialState = {
    lessonInProgress: null,
    lessonsToSync: [],
};
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LESSON_IN_PROGRESS:
            return Object.assign({}, state, { lessonInProgress: action.lessonId });
        case types.SET_LESSON_TO_SYNC:
            const lessonsToSync = [...state.lessonsToSync];
            lessonsToSync.push(action.lessonToSync);
            return Object.assign({}, state, { lessonsToSync });
        case types.RESET_LESSONS_TO_SYNC:
            return Object.assign({}, state, { lessonsToSync: [] });
        case types.RESET_PROGRESS:
            return initialState;
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map