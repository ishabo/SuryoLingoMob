import { IExceptionPayload } from '..'

const namespace = 'SuryoLingo/exceptions'
export const types = {
  ADD: `${namespace}/ADD`,
  REMOVE: `${namespace}/REMOVE`,
  REMOVE_ALL: `${namespace}/REMOVE_ALL`,
}

export const add = (payload: IExceptionPayload) => ({
  payload,
  type: types.ADD,
})

export const remove = (id: number) => ({
  id,
  type: types.REMOVE,
})

export const removeAll = () => ({
  type: types.REMOVE_ALL,
})
