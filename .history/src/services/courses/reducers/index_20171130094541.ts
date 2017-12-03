import { types } from '../actions';

type TTargetLangs = string | 'CL-Syc' | 'Tor-Syr';
type TLearnerLangs = string | 'CL-Ara' | 'Eng';

export interface ICourse {
  id: string;
  name: string;
  target_language: ILanguage<TTargetLangs> | any;
  learner_language: ILanguage<TLearnerLangs> | any;
}

interface ILanguage<T> {
  id: string;
  codeName: T;
}

export interface IModuleAction {
  type: string;
  payload: ICourse[];
}

export const initialState: ICourse[] = [];

export default function (state: ICourse[] = initialState, action: IModuleAction) {
  switch (action.type) {
    case types.SAVE_COURSES:
      return action.payload;
    default:
      return state;
  }
}
