import * as skill from 'services/skills';
import { types } from '../actions';
import cloneDeep from 'clone-deep';

export const initialState: skill.ISkill[] = [];

export const reducer = (state: skill.ISkill[] = initialState, action: skill.ISkillsAction) => {
  switch (action.type) {

    /** Save skills from API result 
     * It also sets the first unit as active
     */
    case types.SAVE_SKILLS:
      const skills = [...action.payload].map((skill: skill.ISkill) => {
        if (skill.unit === 1) {
          skill.active = true;
        }
        return skill;
      });
      return skills;

    case types.ACTIVATE_UNIT:
      return [...state].map((skill: skill.ISkill) => {
        const updatedSkill = { ...skill };
        if (updatedSkill.unit === action.unit) {
          updatedSkill.active = true;
        }
        return updatedSkill;
      });

    case types.MARK_LESSON_FINISHED:
      const { lessonXP: thisLessonXP, lessonId, timestamp } = action;
      const newState = cloneDeep(state);
      newState.map((skill: skill.ISkill) => {

        let totalSkillXP: number = 0;
        let totalFinishedLessons: number = 0;
        skill.lessons = skill.lessons.map((lesson: skill.ILesson) => {

          if (lesson.id === lessonId) {
            lesson.finished = true;

            if (!lesson.lessonHistory) {
              lesson.lessonHistory = [];
            }

            const accomplishment: skill.ILessonHistory = {
              thisLessonXP,
              timestamp,
            };

            lesson.lessonHistory.push(accomplishment);
            lesson.totalLessonXP = lesson.lessonHistory.reduce(
              (totalLessonXP: number, history: skill.ILessonHistory) =>
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

    case types.RESET_SKILLS:
      return initialState;

    default:
      return state;
  }
};

