import * as sagas from './sagas'
import * as actions from './actions'

export interface IStarterActions {
  type?: string
  checkSettings: boolean
}

export { sagas, actions }
