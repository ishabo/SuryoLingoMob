import { saveModules, types } from '../actions';
import { modules as payload } from '../../../data/dummy/modules';

describe('courses actions', () => {
    describe('saveModules', () => {
        it('renders type with payload', () => {
            expect(saveModules(payload)).toEqual({
                type: types.SAVE_MODULES,
                payload
            });
        })
    })
});