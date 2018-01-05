import { types } from '../actions';
import { IProgress, IProgressAction } from '../';

export const initialState: IProgress = {
  activeCourse: null,
  lessonInProgress: null,
  totalUserXP: 0,
};

export const reducer = (
  state: IProgress = initialState,
  action: IProgressAction,
): IProgress => {
  switch (action.type) {

    case types.SET_LESSON_IN_PROGRESS:
      return { ...state, lessonInProgress: action.lessonId };

    default:
      return state;
  }
};
