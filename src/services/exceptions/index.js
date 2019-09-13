import * as reducers from './reducers';
import * as actions from './actions';
import * as selectors from './selectors';
let crashReporter;
let store;
export const setCrashReporter = (newCrashReporter) => {
    crashReporter = newCrashReporter;
};
export const setStore = (newStore) => {
    store = newStore;
};
export const create = (payload) => {
    if (payload.report && crashReporter) {
        crashReporter(`${payload.name}: ${payload.message}`);
    }
    if (store) {
        store.dispatch(actions.add(payload));
    }
    return payload;
};
export { actions, reducers, selectors };
//# sourceMappingURL=index.js.map