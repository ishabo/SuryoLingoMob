import { IAppSettings, IAppSettingsAction } from '@sl/services/settings'
import { types } from '../actions'

export const initialState: IAppSettings = {}

export const reducer = (
  state: IAppSettings = initialState,
  action: IAppSettingsAction,
): IAppSettings => {
  switch (action.type) {
    case types.SAVE_SETTINGS:
      return action.settings
    default:
      return state
  }
}
