import { types } from '../actions';
import { ICourse } from '../../courses/reducers';

export interface IProfile {
  id?: string;
  name?: string;
  email?: string;
}

export interface IProfileAction {
  type: string;
  payload?: IProfile[];
  courseId: ICourse['id'];
}

export const initialState: IProfile = {};

export const reducer = (state: IProfile = initialState, action: IProfileAction) => {
  switch (action.type) {
    case types.SAVE_PROFILE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
