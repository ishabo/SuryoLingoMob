import { types } from '../actions';
export const initialState = [];
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_DICTIONARIES:
            return action.dictionaries;
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map