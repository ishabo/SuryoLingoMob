import { types } from '../actions';

export interface IApiStatus {
  loading: boolean;
}
export const initialState = {
  loading: false,
};

export interface IApiAction {
  loading: boolean;
  type: string;
}

export const reducer = (state: IApiStatus = initialState, action: IApiAction) => {
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};
