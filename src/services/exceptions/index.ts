import { Store, Action } from 'redux'
import * as reducers from './reducers'
import * as actions from './actions'
import * as selectors from './selectors'

export interface IExceptionPayload {
  name: string
  message: string
  report: boolean
  silent?: boolean
  response?: { [key: string]: any }
  action?: () => any
}

export interface IException extends IExceptionPayload {
  id: number
}

export interface IAddAction extends Action {
  payload: IExceptionPayload
}

export interface IRemoveAction extends Action {
  id: number
}

export interface IExceptionAction extends IAddAction, IRemoveAction {}

export interface IState {
  [key: number]: IException
}

let crashReporter: (error: any) => void
let store: Store<any>

export const setCrashReporter = (newCrashReporter: any) => {
  crashReporter = newCrashReporter
}

export const setStore = (newStore: Store<any>) => {
  store = newStore
}

export const create = (payload: IExceptionPayload): IExceptionPayload => {
  if (payload.report && crashReporter) {
    crashReporter(`${payload.name}: ${payload.message}`)
  }

  if (store) {
    store.dispatch(actions.add(payload))
  }

  return payload
}

export { actions, reducers, selectors }
