import { types } from '../actions';
import { IProfile, IProfileAction } from '../';

export const initialState: IProfile = {};

export const reducer = (state: IProfile = initialState, action: IProfileAction) => {
  switch (action.type) {
    case types.SAVE_PROFILE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
