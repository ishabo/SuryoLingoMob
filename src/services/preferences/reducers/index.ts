import { types } from '../actions'
import { IPreferencesAction, IPrefererences } from '@sl/services/preferences'

export const initialState: IPrefererences = {
  customKeyboardEnabled: true,
}

export const reducer = (
  state: IPrefererences = initialState,
  action: IPreferencesAction,
): IPrefererences => {
  switch (action.type) {
    case types.SET_PREFERENCES:
      return { ...state, ...action.preferences }
    case types.TOGGLE_CUSTOM_KEYBOARD:
      return { ...state, customKeyboardEnabled: !state.customKeyboardEnabled }
    default:
      return state
  }
}
