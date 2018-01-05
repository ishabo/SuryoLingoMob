import * as skill from '../actions';
import { skills as payload } from 'data/dummy/skills';

describe('courses actions', () => {
  const { types } = skill;

  describe('saveSkills', () => {
    it('renders type SAVE_SKILLS with payload', () => {
      expect(skill.saveSkills(payload)).toEqual({
        payload,
        type: types.SAVE_SKILLS,
      });
    });
  });

  describe('fetchSkills', () => {
    it('renders type FETCH_SKILLS with courseId', () => {
      expect(skill.fetchSkills('course-1')).toEqual({
        courseId: 'course-1',
        type: types.FETCH_SKILLS,
      });
    });
  });

  describe('activateUnit', () => {
    it('renders type ACTIVATE_UNIT with unit number', () => {
      expect(skill.activateUnit(2)).toEqual({
        unit: 2,
        type: types.ACTIVATE_UNIT,
      });
    });
  });

  describe('activateUnit', () => {
    it('renders type MARK_LESSON_FINISHED with lesson id and xp number', () => {
      expect(skill.markLessonFinished('lesson1', 200)).toEqual({
        lessonId: 'lesson1',
        lessonXP: 200,
        type: types.MARK_LESSON_FINISHED,
      });
    });
  });
});
