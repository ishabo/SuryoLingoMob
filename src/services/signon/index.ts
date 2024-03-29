import { IAction } from '@sl/services/sagas'
import * as reducers from './reducers'
import * as actions from './actions'
import * as api from './api'

export type TSignonType = string | 'signup' | 'signin'

export interface ISignonFormData {
  email: string | null
  password: string | null
  name: string | null
  viaFacebook: boolean
}

export type TSignonFacebookErrors =
  | 'failedToLoginViaFacebook'
  | 'facebookAlreadyConnected'
export type TSignonEmailErrors = 'emailAlreadyExists'
export interface ISignonFormErrors {
  name?: string
  email?: TSignonEmailErrors
  password?: string
  facebook?: TSignonFacebookErrors
}

export interface ISignonState {
  item: ISignonFormData
  errors: ISignonFormErrors
}

export interface ISignonFormAction extends IAction {
  signon?: TSignonType
  data?: ISignonFormData
  errors?: ISignonFormData
  email?: string
}

export { api, actions, reducers }
