import { saveCourses, types } from '../actions';

describe('courses actions', () => {
  describe('saveCourses', () => {
    it('renders type with payload', () => {
      const payload = [{
        id: 'arc-syc',
        name: 'Arabic -> Syriac',
        targetLanguage: {
          id: 'CL-Syr',
          codeName: 'Classical Syriac',
        },
        learnersLanguage: {
          id: 'CL-Ara',
          codeName: 'Classical Arabic',
        },
      }];

      expect(saveCourses(payload)).toEqual({
        payload,
        type: types.SAVE_COURSES,
      });
    });
  });
});
