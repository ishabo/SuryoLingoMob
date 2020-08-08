import { create } from '@sl/services/api'
import { IProfilePayload } from '../'

import { injectDeviceInfo } from '@sl/helpers'

export const createProfile = async (payload: IProfilePayload = {}) =>
  // Creating Profile is the only API call that's done with a default token
  create().post('/users', await injectDeviceInfo(payload))

export const updateProfile = (id: string) => async (
  payload: IProfilePayload = {},
) => create().put(`/users/${id}`, await injectDeviceInfo(payload))

export const getUser = () => create().get('/users')
