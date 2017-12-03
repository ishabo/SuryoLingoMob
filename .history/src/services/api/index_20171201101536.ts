export {
  setOrigin,
  getOrigin,
} from './api';

export type TErrors = IDictionary<number, string>;
export type THeaders = IDictionary<string, string>;
export type TMethod = 'get' | 'post' | 'put';
type ExecutablePromise<T> = () => Promise<T>;

export interface IApiInstance {
  api: any;
  call: (method: TMethod, url: string, ...args: any[]) => Promise<any>;
  get: (...args: any[]) => Promise<any>;
  post: (...args: any[]) => Promise<any>;
  put: (...args: any[]) => Promise<any>;
};

export const create = (path: string, headers: THeaders, errors: TErrors): IApiInstance => {
  const api = createApi({
    path,
    errors,
    headers,
  });

  let requestsQueue: ExecutablePromise<void>[] = [];

  async function makeRequest (method, url, ...args) {
    let response;
    try {
      const authorizationHeader = {
        Authorization: `Token token=${getUserToken}`,
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
      return new Promise(async (resolve, reject) => {
        requestsQueue.push(async () => {
          try {
            const response = await makeRequest(method, url, ...args);
            resolve(response);
          } catch (e) {
            reject(e);
          }
        });
        try {
          await ensureTokenExist();
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