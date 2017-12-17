import { combineReducers } from 'redux';

import * as skill from './skills/reducers';
import * as course from './courses/reducers';
import * as profile from './profile/reducers';
import * as progress from './progress/reducers';
import * as navigation from './nav/reducers';
import * as questions from './questions/reducers';

export interface IInitialState {
  skills: skill.ISkill[];
  courses: course.ICourse[];
  profile: profile.IProfile;
  progress: progress.IProgress;
  questions: questions.IQuestions;
  nav: any;
}

export const initialState: IInitialState = {
  courses: course.initialState,
  skills: skill.initialState,
  profile: profile.initialState,
  progress: progress.initialState,
  questions: questions.initialState,
  nav: navigation.initialState,
};

export default combineReducers({
  courses: course.reducer,
  skills: skill.reducer,
  profile: profile.reducer,
  progress: progress.reducer,
  questions: questions.reducer,
  nav: navigation.reducer,
});
