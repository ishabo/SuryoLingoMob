import * as actions from './actions'
import * as reducers from './reducers'
import { IAction } from '@sl/services/sagas'

export interface IPrefererences {
  customKeyboardEnabled: boolean
}

export interface IPreferencesAction extends IAction {
  preferences?: IPrefererences
}
export { actions, reducers }
