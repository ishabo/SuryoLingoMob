import { types } from '../actions'
import { IDictionary, IDictionaryAction } from '..'

export const initialState = []

export const reducer = (
  state: IDictionary[] = initialState,
  action: IDictionaryAction,
) => {
  switch (action.type) {
    case types.SAVE_DICTIONARIES:
      return action.dictionaries

    default:
      return state
  }
}
