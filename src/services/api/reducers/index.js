import { types } from '../actions';
export const initialState = {
    loading: false,
    success: null,
    message: null,
    alert: false,
};
export const reducer = (state = initialState, action) => {
    const { alert, message, loading } = action;
    switch (action.type) {
        case types.LOADING:
            return loading
                ? Object.assign({}, initialState, { loading }) : Object.assign({}, state, { loading });
        case types.SET_SUCCESS_MESSAGE:
            return Object.assign({}, state, { message, alert, success: true });
        case types.SET_FAILURE_MESSAGE:
            return Object.assign({}, state, { message, alert, success: false });
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map