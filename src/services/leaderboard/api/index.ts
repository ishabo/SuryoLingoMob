import { create } from 'services/api';

export const getLeaderboard = (courseId: string) => {
  const api = create();
  return api.get(`/leaderboards?course=${courseId}`);
};
