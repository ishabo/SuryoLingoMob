import * as api from './api';
import * as reducers from './reducers';
import * as actions from './actions';
import * as selectors from './selectors';
import * as sagas from './sagas';
import { Moment } from 'moment';
import { IQuestion } from 'services/questions';

export interface ILessonHistory {
  timestamp: Moment;
  thisLessonXp: number;
}

export interface ILesson {
  id: string;
  order: number;
  newWords: string;
  finished?: boolean;
  totalLessonXp?: number;
  lessonHistory?: ILessonHistory[];
  questions?: IQuestion[];
}

export interface ISkill {
  id: string;
  unit: number;
  name: string;
  icon: string;
  active?: boolean;
  progress?: number;
  lessons: ILesson[];
  description: string;
  totalSkillXp?: number;
  isComingSoon: boolean;
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

export { api, actions, reducers, selectors, sagas };
