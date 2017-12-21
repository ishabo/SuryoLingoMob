import { types } from '../actions';
import cloneDeep from 'clone-deep';
import moment, { Moment } from 'moment';

interface ILessonHistory {
  timestamp: Moment;
  thisLessonXP: number;
}

export interface ILesson {
  id: string;
  order: number;
  newWords: string;
  finished?: boolean;
  totalLessonXP?: number;
  lessonHistory?: ILessonHistory[];
}

type TImageSizes = string | 'hdpi' | 'mdpi' | 'xhdpi' | 'xxhdpi' | 'xxxhdpi';

export interface ISkill {
  id: string;
  unit: number;
  active?: boolean;
  progress?: number;
  name: string;
  lessons: ILesson[];
  description: string;
  totalSkillXP?: number;
  icons: {
    [key in TImageSizes]: {
      locked: string;
      unlocked: string;
    }
  };
}

export interface ISkillsAction {
  type: string;
  unit?: number;
  lessonId?: string;
  courseId?: string;
  lessonXP?: number;
  payload?: ISkill[];
}

export const initialState: ISkill[] = [];

export const reducer = (state: ISkill[] = initialState, action: ISkillsAction) => {
  switch (action.type) {

    /** Save skills from API result 
     * It also sets the first unit as active
     */
    case types.SAVE_SKILLS:
      const skills = [...action.payload].map((skill: ISkill) => {
        if (skill.unit === 1) {
          skill.active = true;
        }
        return skill;
      });
      return skills;

    case types.ACTIVATE_UNIT:
      return [...state].map((skill: ISkill) => {
        if (skill.unit === action.unit) {
          skill.active = true;
        }
        return skill;
      });

    case types.MARK_LESSON_FINISHED:
      const { lessonXP: thisLessonXP, lessonId } = action;
      const newState = cloneDeep(state);
      newState.map((skill: ISkill) => {

        let totalSkillXP: number = 0;
        let totalFinishedLessons: number = 0;
        skill.lessons = skill.lessons.map((lesson: ILesson) => {
          if (lesson.id === lessonId) {
            lesson.finished = true;

            if (!lesson.lessonHistory) {
              lesson.lessonHistory = [];
            }

            const accomplishment: ILessonHistory = {
              thisLessonXP,
              timestamp: moment(),
            };

            lesson.lessonHistory.push(accomplishment);
            lesson.totalLessonXP = lesson.lessonHistory.reduce(
              (totalLessonXP: number, history: ILessonHistory) =>
                totalLessonXP + history.thisLessonXP,
              0,
            );
          }

          if (Number.isInteger(lesson.totalLessonXP)) {
            totalSkillXP += lesson.totalLessonXP;
          }

          if (lesson.finished) {
            totalFinishedLessons += 1;
          }
          return lesson;
        });

        skill.totalSkillXP = totalSkillXP;
        skill.progress = totalFinishedLessons / skill.lessons.length;
        return skill;
      });
      return newState;
    default:
      return state;
  }
};

