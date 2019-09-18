import * as api from './api';
import * as reducers from './reducers';
import * as actions from './actions';
import * as selectors from './selectors';
import * as sagas from './sagas';
import { IQuestion } from '@sl/services/questions';
import { IAction } from '@sl/services/sagas';

export interface ILessonHistory {
  timestamp: Date;
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

export interface ISkillsAction extends IAction {
  unit?: number;
  lessonId?: string;
  courseId?: string;
  lessonXP?: number;
  payload?: ISkill[];
  timestamp?: Date;
}

export { api, actions, reducers, selectors, sagas };
