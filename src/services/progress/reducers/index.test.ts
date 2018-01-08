import { reducer as progressReducer } from './index';
import { types } from '../actions';

describe('progress reducer', () => {

  it('should set lesson in progress', () => {

    const initialState = {
      lessonInProgress: null,
      lessonsToSync: [],
    };

    const actions = {
      type: types.SET_LESSON_IN_PROGRESS,
      lessonId: 'lesson-id2',
    };

    const newState = progressReducer(initialState, actions);

    expect(newState).toEqual({
      lessonInProgress: 'lesson-id2',
      lessonsToSync: [],
    });
  });
});
