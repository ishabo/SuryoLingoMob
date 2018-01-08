import * as api from './api';
import * as reducers from './reducers';
import * as actions from './actions';
import * as selectors from './selectors';
import * as sagas from './sagas';
import { Moment } from 'moment';

export interface ILessonHistory {
  timestamp: Moment;
  thisLessonXP: number;
}

export interface ILesson {
  id: string;
  order: number;
  newWords: string;
  finished?: boolean;
  totalLessonXP?: number;
  lessonHistory?: ILessonHistory[];
}

type TImageSizes = string | 'hdpi' | 'mdpi' | 'xhdpi' | 'xxhdpi' | 'xxxhdpi';

export interface ISkill {
  id: string;
  unit: number;
  active?: boolean;
  progress?: number;
  name: string;
  lessons: ILesson[];
  description: string;
  totalSkillXP?: number;
  icons: {
    [key in TImageSizes]: {
      locked: string;
      unlocked: string;
    }
  };
}

export interface ISkillsAction {
  type: string;
  unit?: number;
  lessonId?: string;
  courseId?: string;
  lessonXP?: number;
  payload?: ISkill[];
  timestamp?: Moment;
}

export {
  api,
  actions,
  reducers,
  selectors,
  sagas,
};

