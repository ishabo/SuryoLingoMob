import { types } from '../actions';
export const initialState = {
    item: { name: null, email: null, password: null, viaFacebook: false },
    errors: {}
};
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CAPTURE_SIGNON:
            return Object.assign({}, state, { item: action.data });
        case types.SET_ERRORS:
            return Object.assign({}, state, { errors: action.errors });
        case types.RESET_SIGNON:
            return initialState;
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map