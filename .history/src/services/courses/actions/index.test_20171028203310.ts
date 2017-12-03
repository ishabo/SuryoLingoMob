import { saveCourses, types } from '../actions';

describe('courses actions', () => {
    describe('saveCourses', () => {
        it('renders type with payload', () => {
            const payload = [{
                id: 'arc-syc',
                targetLanguage: 'syc',
                learnerLanguage: 'arc'
            }];

            expect(saveCourses(payload)).toEqual({
                type: types.SAVE_COURSES,
                payload
            });
        })
    })
});