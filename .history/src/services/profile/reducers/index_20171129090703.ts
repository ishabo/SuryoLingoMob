import { types } from '../actions';
import { ICourse } from '../../courses/reducers';

interface IUserModules {
  moduleId: string;
  lessonsDone: number;
  finished: boolean;
}

interface IUserCourses {
  courseId: ICourse['id'];
  modules: {
    [key: string]: IUserModules;
  };
}

export interface IProfile {
  id?: string;
  name?: string;
  email?: string;
  currentCourse: ICourse['id'];
  modulesInProgress: string[];
  modulesFinished: string[];
  userXP: number;
}

export interface IModuleAction {
  type: string;
  payload: IProfile[];
}

export const initialState: IProfile[] = [{
  currentCourse: null,
  modulesInProgress: [],
  modulesFinished: [],
  userXP: 0,
}];

export default function (state: IProfile[] = initialState, action: IModuleAction) {
  switch (action.type) {
    case types.SAVE_PROFILE:
      return action.payload;
    default:
      return state;
  }
}
