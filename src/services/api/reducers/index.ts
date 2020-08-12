import { types } from '../actions'

export interface IApiStatus {
  loading: boolean
  success: boolean
  message: string
  alert: boolean
}
export const initialState = {
  loading: false,
  success: null,
  message: null,
  alert: false,
}

export interface IApiAction {
  loading?: boolean
  message?: string
  alert?: boolean
  type: string
}

export const reducer = (
  state: IApiStatus = initialState,
  action: IApiAction,
) => {
  const { alert, message, loading } = action
  switch (action.type) {
    case types.LOADING:
      return loading ? { ...initialState, loading } : { ...state, loading }
    case types.SET_SUCCESS_MESSAGE:
      return { ...state, message, alert, success: true }
    case types.SET_FAILURE_MESSAGE:
      return { ...state, message, alert, success: false }
    default:
      return state
  }
}
