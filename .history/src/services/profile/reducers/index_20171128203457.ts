import { types } from '../actions';
import { ICourse } from '../../courses/reducers';

interface IUserCourses {
  courseId: ICourse['id'];
}

export interface IProfile {
  id: string;
  name: string;
  email: string;
  currentCourse: ICourse['id'];
  courses: {
    [key: ICourse['id']]: IUserCourses;
  },

}

export interface IModuleAction {
  type: string;
  payload: IProfile[];
}

export const initialState: IProfile[] = [{
  id: 'arc-syc',
}];

export default function (state: IProfile[] = initialState, action: IModuleAction) {
  switch (action.type) {
    case types.SAVE_COURSES:
      return action.payload;
    default:
      return state;
  }
}
