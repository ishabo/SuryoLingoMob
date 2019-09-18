import * as reducers from './reducers';
import * as api from './api';
import * as actions from './actions';
import * as sagas from './sagas';
import { IAction } from '@sl/services/sagas';

export interface ILessonDoneParams {
  lessonId: string;
  lessonXP: number;
}

export interface IProgressAction extends IAction {
  skillId?: string;
  lessonId?: string;
  userXp?: number;
  lessonToSync?: ILessonToSync;
}

export interface ILessonToSync {
  lessonId: string;
  skillId: string;
  courseId: string;
  createdAt: Date;
  lessonXP: number;
}

export interface IProgress {
  lessonInProgress: string;
  lessonsToSync: ILessonToSync[];
}

export { api, actions, reducers, sagas };
