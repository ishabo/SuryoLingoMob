import { IAction } from '@sl/services/sagas'
import * as reducers from './reducers'
import * as actions from './actions'

export interface ILeaderboardUser {
  id: string
  name: string
  userXp: number
  profilePic?: string
  ratio: number
}
export interface ILeaderboard {
  topUsers: ILeaderboardUser[]
  currentUserPosition: number
  currentUserCourseXpRatio: number
}

export interface ILeaderboardAction extends IAction {
  leaderboard: ILeaderboard
}

export { actions, reducers }
