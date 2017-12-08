import {
  setProgress, enroleCourse,
  setActiveCourse, setLessonDone, setSkillDone, addXP, types,
} from '../actions';

describe('courses actions', () => {

  describe('setProgress', () => {
    it('renders type with payload', () => {
      const payload = {
        enrolledCourses: ['course-ID-1', 'course-ID-2'],
        activeCourse: 'course-ID-2',
        finishedSkills: ['skill-ID-1'],
        finishedLessons: ['lesson-ID-1', 'lesson-ID-2']
      };
      expect(setProgress(payload)).toEqual({
        payload,
        type: types.SET_PROGRESS,
      });
    });
  });

  describe('enroleCourse', () => {
    it('renders type with payload', () => {
      const courseId = 'course-id';
      expect(enroleCourse(courseId)).toEqual({
        courseId,
        type: types.ENROLE_COURSE,
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
      const lessonId = 'lesson-id';
      expect(setLessonDone(lessonId)).toEqual({
        lessonId,
        type: types.SET_LESSON_DONE,
      });
    });
  });

  describe('setSkillsDone', () => {
    it('renders type with payload', () => {
      const skillId = 'skill-id';
      expect(setSkillDone(skillId)).toEqual({
        skillId,
        type: types.SET_SKILL_DONE,
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
