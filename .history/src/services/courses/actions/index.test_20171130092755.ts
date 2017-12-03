import { saveCourses, types } from '../actions';

describe('courses actions', () => {
  describe('saveCourses', () => {
    it('renders type with payload', () => {
      const payload = [{
        id: 'arc-syc',
        name: 'Arabic -> Syriac',
        target_language: {
          id: 'CL-Syr',
          codeName: 'Classical Syriac',
        },
        learner_language: {
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
