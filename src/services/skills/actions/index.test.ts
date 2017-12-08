import { saveSkills, types } from '../actions';
import { skills as payload } from '../../../data/dummy/skills';

describe('courses actions', () => {
  describe('saveSkills', () => {
    it('renders type with payload', () => {
      expect(saveSkills(payload)).toEqual({
        payload,
        type: types.SAVE_SKILLS,
      });
    });
  });
});
