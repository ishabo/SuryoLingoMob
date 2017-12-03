import * as ApiSauce from 'apisauce';
import * as Exceptions from '../exceptions';
import { isEmpty } from 'lodash';
import { THeaders, TErrors, TMethod } from './index';

let userToken: string = null;
let origin: string = null;

export const getUserToken = () => {
  if (!userToken) {
    throw new Error('No token found');
  }
  return userToken;
};

export const setUserToken = (token: string) => {
  userToken = token;
};

export const getOrigin = () => {
  if (!origin) {
    throw new Error('You need to set the api Origin domain');
  }

  return origin;
};

export const setOrigin = (domain: string) => {
  origin = domain;
};

export interface IApiOptions {
  path: string;
  headers: THeaders;
  errors?: TErrors;
}

export const createApi = (options: IApiOptions) => {

  const { errors, headers, path } = options;

  let statusErrors: { [key: number]: string } = {
    401: 'Invalid token',
    500: 'A server error has occured.',
  };

  if (errors) {
    statusErrors = { ...statusErrors, ...errors };
  }

  const problems: IDictionary<string, string> = {
    TIMEOUT_ERROR: 'There has been a timeout, no response from server!',
    NETWORK_ERROR: 'Oops! Seems like you are not connected to the internet.',
    CONNECTION_ERROR: 'Server not available!',
  };

  const request = ApiSauce.create({
    baseURL: getOrigin(),
    headers: {
      Accept: 'application/json',

      ...headers,
    },
  });

  const observeStatus = (res: ApiSauce.ApiResponse<any>, action: () => any) => {
    const response: ApiSauce.ApiResponse<any> = {
      ...res,
      ...{ data: res.data || {} },
    };

    switch (response.status) {
      case 200:
        console.log(
          `API Success | ${JSON.stringify(response.data)}`,
        );
        break;
      case null:
        throw Exceptions.create({
          response,
          action,
          name: response.problem || 'NETWORK_PROBLEM',
          message: problems[response.problem] || '',
          report: false,
        });
      case 400:
      case 404:
      default:
        throw Exceptions.create({
          response,
          action,
          name: response.data.error || 'UNKNOWN_ERROR',
          message: response.data.error_description || statusErrors[response.status] || '',
          report: response.status !== 404,
        });
    }

    return response;
  };

  return {
    request,

    async call (
      method: TMethod,
      url: string,
      authorizationHeader: THeaders = {},
      ...rest: any[],
    ): Promise<ApiSauce.ApiResponse<any>> {
      if (authorizationHeader['Authorization']) {
        request.setHeaders(<any>authorizationHeader);
      }

      const action = async () => {
        let args = [];
        if (!isEmpty(rest)) {
          args = Object.values(rest).filter((arg: any) => arg !== null);
        }

        console.log(
          `Calling ${method.toUpperCase()} on ${origin}${url} with ${JSON.stringify(
            [...args],
          )}`,
        );

        // TODO: Fix that later when typescript make a fix for it
        let response: ApiSauce.ApiResponse<any>;
        if (method === 'get') {
          response = await request[method](url, ...args);
        } else {
          response = await request[method](url, ...args);
        }

        return response;
      };

      const response = await action();
      return observeStatus(response, action);
    },
  };
};
