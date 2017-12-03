import { types } from '../actions';

type TTargetLangs = string | 'syc' | 'syt';
type TLearnerLangs = string | 'arc' | 'en';

export interface ICourse {
  id: string;
  name: string;
  targetLanguage: TTargetLangs;
  learnerLanguage: TLearnerLangs;
}

interface ILanguage {
  id: string;
  codeName: string;
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
