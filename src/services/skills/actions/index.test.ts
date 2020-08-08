import * as skills from '../actions'
import { skills as payload } from '@sl/data/dummy/skills'

describe('courses actions', () => {
  const { types } = skills

  describe('saveSkills', () => {
    it('renders type SAVE_SKILLS with payload', () => {
      expect(skills.saveSkills(payload)).toStrictEqual({
        payload,
        type: types.SAVE_SKILLS,
      })
    })
  })

  describe('fetchSkills', () => {
    it('renders type FETCH_SKILLS', () => {
      expect(skills.fetchSkills()).toStrictEqual({
        type: types.FETCH_SKILLS,
      })
    })
  })

  describe('activateUnit', () => {
    it('renders type ACTIVATE_UNIT with unit number', () => {
      expect(skills.activateUnit(2)).toStrictEqual({
        unit: 2,
        type: types.ACTIVATE_UNIT,
      })
    })
  })

  describe('marLessonFinished', () => {
    it('renders type MARK_LESSON_FINISHED with lesson id and xp number', () => {
      const timestamp = new Date()

      expect(
        skills.markLessonFinished('lesson1', 200, timestamp),
      ).toStrictEqual({
        timestamp,
        lessonId: 'lesson1',
        lessonXP: 200,
        type: types.MARK_LESSON_FINISHED,
      })
    })
  })
})
