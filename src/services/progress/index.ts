import * as reducers from './reducers';
import * as api from './api';
import * as actions from './actions';
import * as sagas from './sagas';

export interface ILessonDoneParams {
  lessonId: string;
  lessonXP: number;
}

export interface IProgressAction {
  type: string;
  skillId?: string;
  lessonId?: string;
  lessonXP?: number;
  userXP?: number;
}

export interface IProgress {
  activeCourse: string;
  lessonInProgress: string;
  totalUserXP: number;
}

export {
  api,
  actions,
  reducers,
  sagas,
};
