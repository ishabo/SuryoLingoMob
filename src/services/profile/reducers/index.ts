import { types } from '../actions'
import { IProfile, IProfileAction } from '..'

export const initialState: IProfile = {}

export const reducer = (
  state: IProfile = initialState,
  action: IProfileAction,
) => {
  switch (action.type) {
    case types.SAVE_PROFILE:
      return action.data
    case types.RESET_PROFILE:
      return initialState
    default:
      return state
  }
}
