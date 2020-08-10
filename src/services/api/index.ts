import { changeCase } from '@sl/helpers/common'
import { createApi, getUserToken } from './api'
export { setApiOrigin, setUserToken } from './api'
import { IApiInstance, IApiOptions } from './types'

export const create = (options: IApiOptions = {}): IApiInstance => {
  const { baseURL, errors, headers } = options
  const api = createApi({
    errors,
    headers,
    baseURL,
  })

  async function makeRequest(method, url, ...args) {
    let response

    try {
      const authorizationHeader = {
        Authorization: `Token token=${await getUserToken()}`,
      }
      const { data } = await api.call(method, url, authorizationHeader, ...args)
      response = data.result ? data.result : data
    } catch (e) {
      throw e
    }
    return response
  }

  return {
    api,
    call(method, url, ...args) {
      if (method !== 'get' && args[0]) {
        args[0] = changeCase(args[0], 'snake')
      }

      return new Promise(async (resolve, reject) => {
        try {
          const response = await makeRequest(method, url, ...args)
          resolve(response)
        } catch (e) {
          reject(e)
        }
      })
    },
    get(...args) {
      return this.call('get', ...args)
    },
    post(...args) {
      return this.call('post', ...args)
    },
    put(...args) {
      return this.call('put', ...args)
    },
  }
}
