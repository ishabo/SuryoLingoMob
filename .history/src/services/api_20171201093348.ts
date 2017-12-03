import * as ApiSauce from 'apisauce';
import config from '../config';
import * as Exceptions from './exceptions';
import { isEmpty } from 'lodash';

let userToken: string = null;
let origin: string = null;

export const getUserToken = () => {
  if (!userToken) {
    throw new Error('No token found');
  }
  return userToken;
};

export const setToken = (token: string) => {
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

export type TErrors = IDictionary<number, string>;
export type THeaders = IDictionary<string, string>;
export type TMethod = 'get' | 'post' | 'put';

export const createApi = (
  path: string,
  headers: THeaders,
  errors: TErrors = {},
) => {

  const errorsForStatus: { [key: number]: string } = {
    401: 'Invalid token',
    403: 'Access denied!',
    404: 'Not found',
    500: 'A server error has occured.',
    ...errors,
  };

  const errorsForProblems: { [key: string]: string } = {
    TIMEOUT_ERROR: 'There has been a timeout, no response from server!',
    NETWORK_ERROR: 'Oops! Seems like you are not connected to the internet.',
    CONNECTION_ERROR: 'Server not available!',
  };

  const request = ApiSauce.create({
    baseURL: config.apiHost,
    headers: {
      Accept: 'application/json',
      Authorization: `Token token=${getUserToken()}`,
      ...headers,
    },
  });

  const observeStatus = (res: ApiSauce.ApiResponse<any>, action: () => any) => {
    const response: ApiSauce.ApiResponse<any> = {
      ...res,
      ...{ data: res.data || {} },
    };

    switch (response.status) {
      case 409: // Gracefully ignore
        break;
      case 200:
        console.log(
          `API Success: Data returned: ${JSON.stringify(response.data)}`,
        );
        break;
      case null:
        throw Exceptions.create({
          response,
          action,
          name: response.problem || 'NETWORK_PROBLEM',
          message: errorsForProblems[response.problem] || '',
          report: false,
        });
      case 400:
      case 404:
      default:
        throw Exceptions.create({
          response,
          action,
          name: response.data.error || 'UNKNOWN_ERROR',
          message: response.data.error_description || errorsForStatus[response.status] || '',
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
          `Calling ${method.toUpperCase()} on ${request.baseURL}${url} with ${JSON.stringify(
            [...args],
          )}`,
        );

        // TODO: Fix that later when typescript make a fix for it
        let response: ApiSauce.ApiResponse<any>;
        if (method === 'get') {
          response = await apisauce[method](url, ...args);
        } else {
          response = await apisauce[method](url, ...args);
        }

        return response;
      };

      const response = await action();
      return observeStatus(response, action);
    },
  };
};


// import * as ApiSauce from 'apisauce';
// import { isEmpty } from 'ramda';

// import { Exceptions, TEnvironment } from '../';
// import { TMethod, IHeaders, IErrors } from './';

// declare const __DEV__: any;

// let environment: TEnvironment = 'prod';
// let origin: string;

// export const setEnvironment = (newEnvironment: TEnvironment) => {
//   environment = newEnvironment;
// };

// export const getEnvironment = () => {
//   return environment;
// };

// export const setOrigin = (newOrigin: string) => {
//   origin = newOrigin;
// };

// export const getOrigin = () => {
//   return origin;
// };

// export const create = (
//   path: string,
//   headers: IHeaders,
//   errors: IErrors = {},
// ) => {
//   if (environment === 'prod' && __DEV__) {
//     throw new Error('You can\'t use production API in DEV env');
//   }

//   if (!origin) {
//     throw new Error('You need to set origin first');
//   }

//   const errorsForStatus: { [key: number]: string } = {
//     401: 'Invalid token',
//     403: 'Access denied!',
//     404: 'Not found',
//     500: 'A server error has occured.',
//     ...errors,
//   };

//   const errorsForProblems: { [key: string]: string } = {
//     TIMEOUT_ERROR: 'There has been a timeout, no response from server!',
//     NETWORK_ERROR: 'Oops! Seems like you are not connected to the internet.',
//     CONNECTION_ERROR: 'Server not available!',
//   };

//   const request = {
//     baseURL: `${origin}${path}`,
//     timeout: 30000,
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       ...headers,
//     },
//   };

//   const apisauce: ApiSauce.ApisauceInstance = ApiSauce.create(request);

//   const observeStatus = (res: ApiSauce.ApiResponse<any>, action: () => any) => {
//     const response: ApiSauce.ApiResponse<any> = {
//       ...res,
//       ...{ data: res.data || {} },
//     };

//     switch (response.status) {
//       case 409: // Gracefully ignore
//         break;
//       case 200:
//         console.log(
//           `API Success: Data returned: ${JSON.stringify(response.data)}`,
//         );
//         break;
//       case null:
//         throw Exceptions.create({
//           response,
//           action,
//           name: response.problem || 'NETWORK_PROBLEM',
//           message: errorsForProblems[response.problem] || '',
//           report: false,
//         });
//       case 400:
//       case 404:
//       default:
//         throw Exceptions.create({
//           response,
//           action,
//           name: response.data.error || 'UNKNOWN_ERROR',
//           message: response.data.error_description || errorsForStatus[response.status] || '',
//           report: response.status !== 404,
//         });
//     }

//     return response;
//   };

//   return {
//     apisauce,

//     async call(
//       method: TMethod,
//       url: string,
//       authorizationHeader: IHeaders = {},
//       ...rest: any[],
//     ): Promise<ApiSauce.ApiResponse<any>> {
//       if (authorizationHeader['Authorization']) {
//         apisauce.setHeaders(<any>authorizationHeader);
//       }

//       const action = async () => {
//         let args = [];
//         if (!isEmpty(rest)) {
//           args = Object.values(rest).filter((arg: any) => arg !== null);
//         }

//         console.log(
//           `Calling ${method.toUpperCase()} on ${request.baseURL}${url} with ${JSON.stringify(
//             [...args],
//           )}`,
//         );

//         // TODO: Fix that later when typescript make a fix for it
//         let response: ApiSauce.ApiResponse<any>;
//         if (method === 'get') {
//           response = await apisauce[method](url, ...args);
//         } else {
//           response = await apisauce[method](url, ...args);
//         }

//         return response;
//       };

//       const response = await action();
//       return observeStatus(response, action);
//     },
//   };
// };
