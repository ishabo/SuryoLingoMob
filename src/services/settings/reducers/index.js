import { types } from '../actions';
export const initialState = {};
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_SETTINGS:
            return action.settings;
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map