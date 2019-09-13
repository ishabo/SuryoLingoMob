import { types } from '../actions';
export const initialState = [];
let exceptionId = 0;
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD:
            exceptionId += 1;
            return state.concat(Object.assign({ id: exceptionId }, action.payload));
        case types.REMOVE: {
            return state.reduce((prev, stateException) => {
                if (stateException.id !== action.id) {
                    return prev.concat(stateException);
                }
                return prev;
            }, []);
        }
        case types.REMOVE_ALL: {
            return initialState;
        }
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map