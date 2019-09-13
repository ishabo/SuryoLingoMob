import { types } from '../actions';
import cloneDeep from 'clone-deep';
export const initialState = [];
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        /** Save skills from API result
         * It also sets the first unit as active
         */
        case types.SAVE_SKILLS:
            const skills = [...action.payload].map((skill) => {
                if (skill.unit === 1) {
                    skill.active = true;
                }
                return skill;
            });
            return skills;
        case types.ACTIVATE_UNIT:
            return [...state].map((skill) => {
                const updatedSkill = Object.assign({}, skill);
                if (updatedSkill.unit === action.unit) {
                    updatedSkill.active = true;
                }
                return updatedSkill;
            });
        case types.MARK_LESSON_FINISHED:
            const { lessonXP: thisLessonXp, lessonId, timestamp } = action;
            const newState = cloneDeep(state);
            newState.map((skill) => {
                let totalSkillXp = 0;
                let totalFinishedLessons = 0;
                skill.lessons = skill.lessons.map((lesson) => {
                    if (lesson.id === lessonId) {
                        lesson.finished = true;
                        if (!lesson.lessonHistory) {
                            lesson.lessonHistory = [];
                        }
                        const accomplishment = {
                            thisLessonXp,
                            timestamp,
                        };
                        lesson.lessonHistory.push(accomplishment);
                        lesson.totalLessonXp = lesson.lessonHistory.reduce((totalLessonXp, history) => totalLessonXp + history.thisLessonXp, 0);
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
//# sourceMappingURL=index.js.map