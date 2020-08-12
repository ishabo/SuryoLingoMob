import { create } from '@sl/services/api'
import { injectDeviceInfo } from '@sl/helpers'
import { IProfilePayload } from '..'

export const createProfile = async (payload: IProfilePayload = {}) =>
  // Creating Profile is the only API call that's done with a default token
  create().post('/users', await injectDeviceInfo(payload))

export const updateProfile = (id: string) => async (
  payload: IProfilePayload = {},
) => create().put(`/users/${id}`, await injectDeviceInfo(payload))

export const getUser = () => create().get('/users')
