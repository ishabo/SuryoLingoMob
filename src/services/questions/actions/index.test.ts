import { saveQuestions, types } from '../actions';
import payload from 'data/dummy/questions';

describe('questions actions', () => {
  describe('saveQuestions', () => {
    it('renders type with payload', () => {
      expect(saveQuestions(payload)).toEqual({
        payload,
        type: types.SAVE_QUESTIONS,
      });
    });
  });
});
