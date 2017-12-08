import { types } from '../actions';

type TTargetLangs = string | 'CL-Syc' | 'Tor-Syr';
type TLearnerLangs = string | 'CL-Ara' | 'Eng';

export interface ICourse {
  id: string;
  name?: string;
  targetLanguage: ILanguage<TTargetLangs> | any;
  learnersLanguage: ILanguage<TLearnerLangs> | any;
}

interface ILanguage<T> {
  id: string;
  codeName: T;
}

export interface ISkillsAction {
  type: string;
  payload: ICourse[];
}

export const initialState: ICourse[] = [];

export const courseReducer = (state: ICourse[] = initialState, action: ISkillsAction) => {
  switch (action.type) {
    case types.SAVE_COURSES:
      return action.payload;
    default:
      return state;
  }
};

