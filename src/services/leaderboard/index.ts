import * as reducers from './reducers';
import * as actions from './actions';
import * as sagas from './sagas';

export interface ILeaderboardUser {
  id: string;
  name: string;
  userXp: string;
}
export interface ILeaderboard {
  users: ILeaderboardUser[];
  currentUserPosition: number;
}

export interface ILeaderboardAction {
  type: string;
  leaderboard: ILeaderboard;
}

export { actions, reducers, sagas };
