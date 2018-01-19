import * as ApiSauce from 'apisauce';
import * as Exceptions from '../exceptions';
import { isEmpty } from 'lodash';
import { THeaders, TErrors, TMethod } from './index';
import { changeCase } from 'helpers';

let userToken: string = null;
let origin: string = null;

export const getUserToken = async () => {
  if (!userToken) {
    throw new Error('Token is not set');
  }
  return userToken;
};

export const setUserToken = (token: string) => {
  userToken = token;
};

export const getApiOrigin = () => {
  if (!origin) {
    throw new Error('You have either called getApiOrigin() before setUserToken, '
      + 'or in the global scope, or you have not actuallt called setApiOrigin yet.');
  }

  return origin;
};

export const setApiOrigin = (domain: string) => {
  origin = domain;
};

export interface IApiOptions {
  headers: THeaders;
  errors?: TErrors;
}

export const createApi = (options: IApiOptions) => {

  const { errors, headers } = options;

  let statusErrors: { [key: number]: string } = {
    401: 'Invalid token',
    500: 'A server error has occured.',
  };

  if (errors) {
    statusErrors = { ...statusErrors, ...errors };
  }

  const problems: IDictionary<string> = {
    TIMEOUT_ERROR: 'There has been a timeout, no response from server!',
    NETWORK_ERROR: 'Oops! Seems like you are not connected to the internet.' + getApiOrigin(),
    CONNECTION_ERROR: 'Server not available!',
  };

  const request: ApiSauce.ApisauceInstance = ApiSauce.create({
    baseURL: getApiOrigin(),
    timeout: 1000,
    headers: {
      agentOptions: {
        rejectUnauthorized: false,
      },
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
      case 401:
        throw Exceptions.create({
          response,
          action,
          name: 'INVALID_TOKEN',
          message: statusErrors[response.status] || '',
          report: false,
        });
      case 500:
        throw Exceptions.create({
          response,
          action,
          name: 'INTERNAL_SERVER_ERROR',
          message: response.data.exception,
          report: true,
        });
      case 404:
      case 400:
      case 409:
      default:
        throw Exceptions.create({
          response,
          action,
          name: response.data.error || 'UNKNOWN_ERROR',
          message: response.data.error_description || statusErrors[response.status] || '',
          report: response.status !== 404,
        });
    }

    const { data } = response;
    response.data = changeCase(data, 'camel');

    return response;
  };

  return {
    request,

    async call (
      method: TMethod,
      url: string,
      headers: THeaders = {},
      ...rest: any[],
    ): Promise<ApiSauce.ApiResponse<any>> {
      if (headers['Authorization']) {
        request.setHeaders(<any>headers);
      }

      const action = async () => {
        let args = [url];

        if (!isEmpty(rest)) {
          const filteredRest = (<any>Object).values(rest).filter((arg: any) => arg !== null);
          args = args.concat(filteredRest);
        }

        console.log(
          `Calling ${method.toUpperCase()} on ${origin}${url} with ${JSON.stringify(
            [...args],
          )}`,
        );

        let response: ApiSauce.ApiResponse<any>;

        response = await request[method].apply(null, args);

        return response;
      };

      const response = await action();
      return observeStatus(response, action);
    },
  };
};
