import payload from '@sl/data/dummy/questions'
import { saveQuestions, types } from '.'

describe('questions actions', () => {
  describe('saveQuestions', () => {
    it('renders type with payload', () => {
      expect(saveQuestions(payload)).toStrictEqual({
        payload,
        type: types.SAVE_QUESTIONS,
      })
    })
  })
})
