import { types } from '../actions'
import { ILeaderboard, ILeaderboardAction } from '..'

export const initialState = {
  topUsers: [],
  currentUserPosition: 0,
  currentUserCourseXpRatio: 0,
}

export const reducer = (
  state: ILeaderboard = initialState,
  action: ILeaderboardAction,
) => {
  switch (action.type) {
    case types.SET_LEADERBOARD:
      return action.leaderboard
    default:
      return state
  }
}
