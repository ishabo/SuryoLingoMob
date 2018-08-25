import { ILeaderboard } from '../';

const namespace = 'SuryoLingo/leaderboard';

export const types = {
  SET_LEADERBOARD: `${namespace}/SET_LEADERBOARD`,
  FETCH_LEADERBOARD: `${namespace}/FETCH_LEADERBOARD`
};

export const saveLeaderboard = (leaderboard: ILeaderboard[]) => ({
  leaderboard,
  type: types.SET_LEADERBOARD
});

export const fetchLeaderboard = () => ({
  type: types.FETCH_LEADERBOARD
});
