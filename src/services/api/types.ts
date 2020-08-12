export type TErrors = IIndex<string>
export type THeaders = IDictionary<string>
export type TMethod = 'get' | 'post' | 'put'

export interface IApiOptions {
  headers?: THeaders
  errors?: TErrors
  baseURL?: string
}

export interface IApiInstance {
  api: any
  call: (method: TMethod, url: string, ...args: any[]) => Promise<any>
  get: (...args: any[]) => Promise<any>
  post: (...args: any[]) => Promise<any>
  put: (...args: any[]) => Promise<any>
}
