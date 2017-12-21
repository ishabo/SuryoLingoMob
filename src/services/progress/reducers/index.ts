import { types } from '../actions';

export interface IProgressAction {
  type: string;
  skillId?: string;
  lessonId?: string;
  lessonXP?: number;
  userXP?: number;
}

export interface IProgress {
  activeCourse: string;
  lessonInProgress: string;
  totalUserXP: number;
}

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
