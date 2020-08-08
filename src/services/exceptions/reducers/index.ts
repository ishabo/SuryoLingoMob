import { IException, IExceptionAction } from '../'
import { types } from '../actions'

export const initialState: IException[] = []

let exceptionId = 0

export const reducer = (
  state: ReadonlyArray<IException> = initialState,
  action: IExceptionAction,
) => {
  switch (action.type) {
    case types.ADD:
      exceptionId += 1
      return state.concat({
        id: exceptionId,
        ...action.payload,
      } as IException)
    case types.REMOVE: {
      return state.reduce(
        (prev: IException[], stateException: IException): IException[] => {
          if (stateException.id !== action.id) {
            return prev.concat(stateException)
          }
          return prev
        },
        [] as IException[],
      )
    }
    case types.REMOVE_ALL: {
      return initialState
    }
    default:
      return state
  }
}
