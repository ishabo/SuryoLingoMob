import { reducer as preferencesReducer } from './index';
import { types } from '../actions';
describe('preferences reducer', () => {
    it('should set lesson in progress', () => {
        const initialState = {
            customKeyboardEnabled: true
        };
        const actions = {
            type: types.SET_PREFERENCES,
            preferences: {
                customKeyboardEnabled: false
            }
        };
        const newState = preferencesReducer(initialState, actions);
        expect(newState).toEqual({
            customKeyboardEnabled: false
        });
    });
});
//# sourceMappingURL=index.test.js.map