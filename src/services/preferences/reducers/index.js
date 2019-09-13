import { types } from '../actions';
export const initialState = {
    customKeyboardEnabled: true
};
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_PREFERENCES:
            return Object.assign({}, state, action.preferences);
        case types.TOGGLE_CUSTOM_KEYBOARD:
            return Object.assign({}, state, { customKeyboardEnabled: !state.customKeyboardEnabled });
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map