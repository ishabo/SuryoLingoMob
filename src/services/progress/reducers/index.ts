import { types } from '../actions';
import { IProgress, IProgressAction } from '../';

export const initialState: IProgress = {
  lessonInProgress: null,
  lessonsToSync: [],
};

export const reducer = (
  state: IProgress = initialState,
  action: IProgressAction,
): IProgress => {
  switch (action.type) {

    case types.SET_LESSON_IN_PROGRESS:
      return { ...state, lessonInProgress: action.lessonId };

    case types.SET_LESSON_TO_SYNC:
      const lessonsToSync = [...state.lessonsToSync];
      lessonsToSync.push(action.lessonToSync);
      return { ...state, lessonsToSync };

    case types.RESET_LESSONS_TO_SYNC:
      return { ...state, lessonsToSync: [] };

    case types.RESET_PROGRESS:
      return initialState;

    default:
      return state;
  }
};
