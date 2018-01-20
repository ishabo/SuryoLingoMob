import { types } from '../actions';
import { ISignonFormAction, ISignonState } from '../';

export const initialState: ISignonState = {
  item: { email: null, password: null },
  errors: {},
};

export const reducer = (state: ISignonState = initialState, action: ISignonFormAction) => {
  switch (action.type) {
    case types.CAPTURE_SIGNON:
      return { ...state, item: action.data };
    case types.SET_ERRORS:
      return { ...state, errors: action.errors };
    default:
      return state;
  }
};
