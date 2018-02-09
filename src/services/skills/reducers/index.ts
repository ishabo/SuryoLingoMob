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
      const { lessonXP: thisLessonXp, lessonId, timestamp } = action;
      const newState = cloneDeep(state);
      newState.map((skill: skill.ISkill) => {

        let totalSkillXp: number = 0;
        let totalFinishedLessons: number = 0;
        skill.lessons = skill.lessons.map((lesson: skill.ILesson) => {

          if (lesson.id === lessonId) {
            lesson.finished = true;

            if (!lesson.lessonHistory) {
              lesson.lessonHistory = [];
            }

            const accomplishment: skill.ILessonHistory = {
              thisLessonXp,
              timestamp,
            };

            lesson.lessonHistory.push(accomplishment);
            lesson.totalLessonXp = lesson.lessonHistory.reduce(
              (totalLessonXp: number, history: skill.ILessonHistory) =>
                totalLessonXp + history.thisLessonXp,
              0,
            );
          }

          if (Number.isInteger(lesson.totalLessonXp)) {
            totalSkillXp += lesson.totalLessonXp;
          }

          if (lesson.finished) {
            totalFinishedLessons += 1;
          }
          return lesson;
        });

        skill.totalSkillXp = totalSkillXp;
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

