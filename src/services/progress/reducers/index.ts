import { types } from '../actions';
import moment, { Moment } from 'moment';
import cloneDeep from 'clone-deep';

export interface IProgressAction {
  type: string;
  courseId?: string;
  skillId?: string;
  lessonId?: string;
  lessonXP?: number;
  userXP?: number;
}

interface ILessonsHistory {
  timestamp: Moment;
  thisLessonXP: number;
}

interface ILessonDone {
  totalLessonXp: number;
  history: ILessonsHistory[];
}

interface ILessonsDone {
  [key: string]: ILessonDone;
}

interface ISkillProgress {
  finished: boolean;
  totalSkillXP: number;
  lessonsDone: ILessonsDone;
}

interface ISkillsProgress {
  [key: string]: ISkillProgress | null;
}

export interface IProgress {
  activeCourse: string;
  enrolledCourses: string[];
  skillsProgress: ISkillsProgress;
  lessonInProgress: string;
  totalUserXP: number;
}

export const initialState: IProgress = {
  activeCourse: null,
  skillsProgress: {},
  enrolledCourses: [],
  lessonInProgress: null,
  totalUserXP: 0,
};

const calcTotalSkillXP = (totalXP: number = 0, lesson: ILessonDone) =>
  totalXP + lesson.totalLessonXp;

export const reducer = (
  state: IProgress = initialState,
  action: IProgressAction,
): IProgress => {
  const { courseId, skillId, lessonId, lessonXP } = action;
  const initialSkillProgress = { finished: false, totalSkillXP: 0, lessonsDone: {} };
  switch (action.type) {

    /* ******* Set skill in progress *******
     * When user clicks ont he skill for the first
     * time, the skill should be registered as in
     * progress. If the skill already exists in 
     * progress, then the action is ignored.
     ***************************************/
    case types.SET_SKILL_IN_ROGRESS:
      if (state.skillsProgress[skillId]) {
        // Avoid overwriting skill progress;
        return state;
      }
      return {
        ...state, skillsProgress: {
          ...state.skillsProgress,
          [skillId]: initialSkillProgress,
        },
      };

    /* ********** Switching Course *********
     * This marks activeCourse and registers the courseId in enroleldCourses
     * if the user hasn't enrolled before.
     ***************************************/
    case types.SET_ACTIVE_COUTSE:
      const enrolledCourses = [...state.enrolledCourses];
      if (enrolledCourses.indexOf(courseId) === -1) {
        enrolledCourses.push(courseId);
      }
      return { ...state, enrolledCourses, activeCourse: courseId };

    /* ******* Marking lesson as done *******
     * This is to mark a lesson under a certain skill as done
     * but also records everytime the user passes the lesson
     * again, and calculates the total XP for lesson and total
     * XP for the skill under which the lesson exists.
     ***************************************/
    case types.SET_LESSON_DONE:
      const newState = cloneDeep(state);

      if (!skillId) {
        console.error('skillId is not set!');
      }

      if (!newState.skillsProgress[skillId]) {
        newState.skillsProgress[skillId] = initialSkillProgress;
      }

      const existingLesson = newState.skillsProgress[skillId].lessonsDone[lessonId];

      if (!existingLesson) {
        newState.skillsProgress[skillId].lessonsDone[lessonId] = {
          totalLessonXp: 0,
          history: [],
        };
      }

      const newAccomplishment = { timestamp: moment(), thisLessonXP: lessonXP };
      newState.skillsProgress[skillId].lessonsDone[lessonId].totalLessonXp += lessonXP;
      newState.skillsProgress[skillId].lessonsDone[lessonId].history.push(newAccomplishment);

      const lessons = newState.skillsProgress[skillId].lessonsDone;
      const totalSkillXP = (<any>Object).values(lessons).reduce(calcTotalSkillXP, 0);

      newState.skillsProgress[skillId].totalSkillXP = totalSkillXP;
      return newState;

    case types.SET_LESSON_IN_PROGRESS:
      return { ...state, lessonInProgress: action.lessonId };

    default:
      return state;
  }
};
