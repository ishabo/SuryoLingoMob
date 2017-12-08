import { types } from '../actions';
import { ICourse } from '../../courses/reducers';

export interface IProfile {
  id?: string;
  name?: string;
  email?: string;
  currentCourse: ICourse['id'];
  skillsInProgress: string[];
  skillsFinished: string[];
  userXP: number;
}

export interface IProfileAction {
  type: string;
  payload?: IProfile[];
  courseId: ICourse['id'];
}

export const initialState: IProfile = {
  currentCourse: null,
  skillsInProgress: [],
  skillsFinished: [],
  userXP: 0,
};

export const profileReducer = (state: IProfile = initialState, action: IProfileAction) => {
  switch (action.type) {
    case types.SAVE_PROFILE:
      return { ...state, ...action.payload };
    case types.SWITCH_COURSE:
      const newState = { ...state };
      newState.currentCourse = action.courseId;
      return newState;
    default:
      return state;
  }
};
