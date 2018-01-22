export {
  setApiOrigin,
  setUserToken,
} from './api';

import { createApi, getUserToken } from './api';
import { changeCase } from 'helpers';

export type TErrors = IIndex<string>;
export type THeaders = IDictionary<string>;
export type TMethod = 'get' | 'post' | 'put';

export interface IApiInstance {
  api: any;
  call: (method: TMethod, url: string, ...args: any[]) => Promise<any>;
  get: (...args: any[]) => Promise<any>;
  post: (...args: any[]) => Promise<any>;
  put: (...args: any[]) => Promise<any>;
}

export const create = (headers?: THeaders, errors?: TErrors): IApiInstance => {
  const api = createApi({
    errors,
    headers,
  });

  async function makeRequest(method, url, ...args) {
    let response;
    try {
      const authorizationHeader = {
        Authorization: `Token token=${await getUserToken()}`,
      };
      response = await api.call(method, url, authorizationHeader, ...args);
      response = response ? response.data : null;
    } catch (e) {
      throw e;
    }
    return response;
  }

  return {
    api,
    call (method, url, ...args) {
      if (method !== 'get' && args[0]) {
        args[0] = changeCase(args[0], 'snake');
      }

      return new Promise(async (resolve, reject) => {
        try {
          const response = await makeRequest(method, url, ...args);
          resolve(response);
        } catch (e) {
          reject(e);
        }
      });
    },
    get (...args) {
      return this.call('get', ...args);
    },
    post (...args) {
      return this.call('post', ...args);
    },
    put (...args) {
      return this.call('put', ...args);
    },
  };
};
