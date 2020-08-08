import { create } from '@sl/services/api'

export const getQuestions = (lessonId) => {
  const api = create()
  return api.get(`/questions?lesson=${lessonId}`)
}
