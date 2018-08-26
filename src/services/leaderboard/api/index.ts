import { create } from 'services/api';

export const getLeaderboard = () => {
  const api = create();
  return api.get('/leaderboards');
};
