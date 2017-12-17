import {
  setSkillInProgress, switchCourse,
  setActiveCourse, setLessonDone,
  addXP, types,
} from '../actions';

describe('courses actions', () => {

  describe('switchCourse', () => {
    it('returns type SWITCH_COURSE with courseId', () => {
      const courseId = 'course-id';
      expect(switchCourse(courseId)).toEqual({
        courseId,
        type: types.SWITCH_COURSE,
      });
    });
  });

  describe('setActiveCourse', () => {
    it('renders type with payload', () => {
      const courseId = 'course-id';
      expect(setActiveCourse(courseId)).toEqual({
        courseId,
        type: types.SET_ACTIVE_COUTSE,
      });
    });
  });

  describe('setLessonDone', () => {
    it('renders type with payload', () => {
      const skillId = 'skill-id';
      const lessonId = 'lesson-id';
      const lessonXP = 400;

      expect(setLessonDone({ skillId, lessonId, lessonXP })).toEqual({
        skillId,
        lessonId,
        lessonXP,
        type: types.SET_LESSON_DONE,
      });
    });
  });

  describe('setSkillInProgress', () => {
    it('renders type with payload', () => {
      const skillId = 'skill-id';
      expect(setSkillInProgress(skillId)).toEqual({
        skillId,
        type: types.SET_SKILL_IN_ROGRESS,
      });
    });
  });

  describe('addXP', () => {
    it('renders type with payload', () => {
      const xp = 10;
      expect(addXP(xp)).toEqual({
        xp,
        type: types.ADD_XP,
      });
    });
  });
});
