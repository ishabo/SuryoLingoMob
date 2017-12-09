import { types } from '../actions';
import moment, { Moment } from 'moment';

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
  lessonsDone?: ILessonsDone;
}

interface ISkillsProgress {
  [key: string]: ISkillProgress | null;
}

export interface IProgress {
  activeCourse: string;
  enrolledCourses: string[];
  skillsProgress: ISkillsProgress;
  totalUserXP: number;
}

export const initialState: IProgress = {
  activeCourse: null,
  skillsProgress: {},
  enrolledCourses: [],
  totalUserXP: 0,
};

const calcTotalSkillXP = (totalXP: number = 0, lesson: ILessonDone) =>
  totalXP + lesson.totalLessonXp;

export default function (state: IProgress = initialState, action: IProgressAction) {
  const { courseId, skillId, lessonId, lessonXP } = action;
  const initialSkillProgress = { finished: false, totalSkillXP: 0 };

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
          ...state.skillsProgress, [skillId]: initialSkillProgress,
        },
      };

    /* ********** Switching Course *********
     * This marks activeCourse and registers the courseId in enroleldCourses
     * if the user hasn't enrolled before.
     ***************************************/
    case types.SET_ACTIVE_COUTSE:
      const { enrolledCourses } = state;
      if (enrolledCourses.indexOf(courseId) === -1) {
        enrolledCourses.push(courseId);
      }
      return { ...state, enrolledCourses, activeCourse: courseId };

    /* ******* Marking lesson as done *******
     * This is to mark a lesson under a certain skill as done
     * but also records everytime the user passes the lesson
     * again, and calculates the total XP for lesson and total
     * XO for the skill under which the lesson exists.
     ***************************************/
    case types.SET_LESSON_DONE:
      const newState = { ...state };

      if (!newState.skillsProgress[skillId]) {
        newState.skillsProgress[skillId] = initialSkillProgress;
      }

      const existingLesson = newState.skillsProgress[skillId].lessonsDone[lessonId];
      const newAccomplishment = { timestamp: moment(), thisLessonXP: lessonXP };

      if (!existingLesson) {
        newState.skillsProgress[skillId].lessonsDone[lessonId] = {
          totalLessonXp: 0,
          history: [],
        };
      }

      newState.skillsProgress[skillId].lessonsDone[lessonId].totalLessonXp += lessonXP;
      newState.skillsProgress[skillId].lessonsDone[lessonId].history.push(newAccomplishment);
      const lessons = newState.skillsProgress[skillId].lessonsDone;
      const totalSkillXP = (<any>Object).values(lessons).reduce(calcTotalSkillXP, 0);

      newState.skillsProgress[skillId].totalSkillXP = totalSkillXP;
      return newState;

    default:
      return state;
  }
}
