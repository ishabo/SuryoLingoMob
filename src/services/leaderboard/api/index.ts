import { create } from '@sl/services/api'

export const getLeaderboard = (courseId: string) => {
  const api = create()
  return api.get(`/leaderboards?course=${courseId}&limit=10`)
}
