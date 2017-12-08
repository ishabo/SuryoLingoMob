import { types } from '../actions';

export interface ISkillsAction {
  type: string;
  courseId?: string;
  skillId?: string;
  lessonId?: string;
  xp?: number;
}

export interface IProgress {
  enrolledCourses: string[];
  activeCourse: string;
  finishedSkills: string[];
  finishedLessons: string[];
}

export const initialState: IProgress = {
  activeCourse: '',
  enrolledCourses: [],
  finishedSkills: [],
  finishedLessons: [],
};

export default function (state: IProgress = initialState, action: ISkillsAction) {
  switch (action.type) {
    case types.SET_LESSON_DONE:
      const { lessonId } = action;
      const finishedLessons = [...state.finishedLessons];

      if (finishedLessons && finishedLessons.indexOf(lessonId) === -1) {
        finishedLessons.push(lessonId);
        return { ...state, ...finishedLessons };
      } else {
        return state;
      }
    default:
      return state;
  }
}
