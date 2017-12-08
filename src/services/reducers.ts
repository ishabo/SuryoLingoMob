import { combineReducers } from 'redux';

import {
  skillReducer,
  initialState as skillsInitialState,
  ISkill,
} from '../services/skills/reducers';
import {
  courseReducer,
  initialState as courseInitialState,
  ICourse,
} from '../services/courses/reducers';

import {
  profileReducer,
  initialState as profileInitialState,
  IProfile,
} from '../services/profile/reducers';

import {
  navigationReducer,
  navigationInitialState,
} from './navigation/reducers';

interface IInitialState {
  skills: ISkill[];
  courses: ICourse[];
  profile: IProfile;
  nav: any;
}

export const initialState: IInitialState = {
  courses: courseInitialState,
  skills: skillsInitialState,
  profile: profileInitialState,
  nav: navigationInitialState,
};

export default combineReducers({
  courses: courseReducer,
  skills: skillReducer,
  profile: profileReducer,
  nav: navigationReducer,
});
