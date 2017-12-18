import { types } from '../actions';

export interface ILesson {
  id: string;
  order: number;
  newWords: string[];
}

type TImageSizes = string | 'hdpi' | 'mdpi' | 'xhdpi' | 'xxhdpi' | 'xxxhdpi';

export interface ISkill {
  id: string;
  unit: number;
  name: string;
  lessons: ILesson[];
  description: string;
  icons: {
    [key in TImageSizes]: {
      locked: string;
      unlocked: string;
    }
  };
}

export interface ISkillsAction {
  type: string;
  courseId?: string;
  payload?: ISkill[];
}

export const initialState: ISkill[] = [];

export const reducer = (state: ISkill[] = initialState, action: ISkillsAction) => {
  switch (action.type) {
    case types.SAVE_SKILLS:
      return action.payload;
    default:
      return state;
  }
};

