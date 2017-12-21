import { types } from '../actions';
import cloneDeep from 'clone-deep';

export type TTargetLangs = string | 'cl-syc' | 'tor-syr';
export type TLearnerLangs = string | 'cl-ara' | 'eng';

export interface ICourse {
  id: string;
  name?: string;
  enrolled?: boolean;
  active?: boolean;
  targetLanguage: ILanguage<TTargetLangs>;
  learnersLanguage: ILanguage<TLearnerLangs>;
}

export interface ILanguage<T> {
  id: string;
  shortName: T;
  name: string;
  fullName: string;
}

export interface ICourseAction {
  type: string;
  courseId?: string;
  courses?: ICourse[];
}

export const initialState: ICourse[] = [];

export const reducer = (state: ICourse[] = initialState, action: ICourseAction) => {
  switch (action.type) {
    case types.SAVE_COURSES:
      return action.courses;

    case types.ENROLL_IN_COURSE:
      return cloneDeep(state).map((course: ICourse) => {
        if (course.id === action.courseId) {
          course.enrolled = true;
        }
        return course;
      });

    case types.SET_COURSE_ACTIVE:
      return cloneDeep(state).map((course: ICourse) => {
        course.active = (course.id === action.courseId);
        return course;
      });
    default:
      return state;
  }
};

