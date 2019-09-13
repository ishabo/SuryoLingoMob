import { types } from '../actions';
export const initialState = {};
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_PROFILE:
            return action.data;
        case types.RESET_PROFILE:
            return initialState;
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map