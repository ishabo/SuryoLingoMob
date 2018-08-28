import * as reducers from './reducers';
import * as actions from './actions';
import * as sagas from './sagas';
import { IAction } from 'services/sagas';

export interface ILeaderboardUser {
  id: string;
  name: string;
  userXp: number;
  ratio: number;
}
export interface ILeaderboard {
  topUsers: ILeaderboardUser[];
  currentUserPosition: number;
  currentUserCourseXpRatio: number;
}

export interface ILeaderboardAction extends IAction {
  leaderboard: ILeaderboard;
}

export { actions, reducers, sagas };
