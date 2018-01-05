import { combineReducers } from 'redux';

import * as skill from './skills';
import * as course from './courses';
import * as profile from './profile';
import * as progress from './progress';
import * as navigation from './nav/reducers';
import * as questions from './questions';
import * as dictionaries from './dictionaries';
import * as api from './api/reducers';
import * as exceptions from './exceptions';

export interface IInitialState {
  nav: any;
  api: api.IApiStatus;
  skills: skill.ISkill[];
  courses: course.ICourse[];
  profile: profile.IProfile;
  progress: progress.IProgress;
  questions: questions.IQuestions;
  dictionaries: dictionaries.IDictionary[];
  exceptions: exceptions.IException[];
}

export const initialState: IInitialState = {
  nav: navigation.initialState,
  api: api.initialState,
  courses: course.reducers.initialState,
  skills: skill.reducers.initialState,
  profile: profile.reducers.initialState,
  progress: progress.reducers.initialState,
  questions: questions.reducers.initialState,
  dictionaries: dictionaries.reducers.initialState,
  exceptions: exceptions.reducers.initialState,
};

export default combineReducers({
  nav: navigation.reducer,
  api: api.reducer,
  courses: course.reducers.reducer,
  skills: skill.reducers.reducer,
  profile: profile.reducers.reducer,
  progress: progress.reducers.reducer,
  questions: questions.reducers.reducer,
  dictionaries: dictionaries.reducers.reducer,
  exceptions: exceptions.reducers.reducer,
});
