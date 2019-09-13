import * as tslib_1 from "tslib";
import * as ApiSauce from 'apisauce';
import * as Exceptions from '../exceptions';
import { isEmpty } from 'lodash';
import { changeCase } from 'helpers';
let userToken = null;
let origin = null;
export const getUserToken = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    if (!userToken) {
        throw new Error('Token is not set');
    }
    return userToken;
});
export const setUserToken = (token) => {
    userToken = token;
};
export const getApiOrigin = () => {
    if (!origin) {
        throw new Error('You have either called getApiOrigin() before setUserToken, ' +
            'or in the global scope, or you have not actuallt called setApiOrigin yet.');
    }
    return origin;
};
export const setApiOrigin = (domain) => {
    origin = domain;
};
export const createApi = (options) => {
    const { errors, headers, baseURL = getApiOrigin() } = options;
    let statusErrors = {
        404: 'Resource not found',
        401: 'Invalid token',
        402: 'Failed to login',
        500: 'A server error has occured.',
        422: 'Your request contains invalid data'
    };
    if (errors) {
        statusErrors = Object.assign({}, statusErrors, errors);
    }
    const problems = {
        TIMEOUT_ERROR: `There has been a timeout, no response from server ${getApiOrigin()}!`,
        NETWORK_ERROR: `Oops! Seems like you are not connected to the internet. ${getApiOrigin()}`,
        CONNECTION_ERROR: 'Server not available!'
    };
    const request = ApiSauce.create({
        baseURL,
        timeout: 60000,
        headers: Object.assign({ agentOptions: {
                rejectUnauthorized: false
            }, Accept: 'application/json', 'Content-Type': 'application/json' }, headers)
    });
    const observeStatus = (res, action) => {
        const response = Object.assign({}, res, { data: res.data || {} });
        if (response.status === 200) {
            console.log(`API Success | ${JSON.stringify(response.data)}`);
        }
        else {
            let exceptionPayload = {};
            switch (response.status) {
                case null:
                    exceptionPayload = {
                        name: response.problem || 'NETWORK_PROBLEM',
                        message: problems[response.problem] || ''
                    };
                    break;
                case 401:
                case 402:
                    exceptionPayload = {
                        name: response.status === 401 ? 'INVALID_TOKEN' : 'INVALID_AUTH',
                        message: statusErrors[response.status] || '',
                        report: response.status === 401
                    };
                    break;
                case 500:
                    exceptionPayload = {
                        name: 'INTERNAL_SERVER_ERROR',
                        message: response.data.exception,
                        report: true
                    };
                    break;
                case 404:
                    exceptionPayload = {
                        name: 'NOT_FOUND',
                        message: response.data.error || statusErrors[response.status] || '',
                        report: true
                    };
                    break;
                case 400:
                    exceptionPayload = {
                        name: 'BAD_REQUEST',
                        message: response.data.error || '',
                        report: true
                    };
                    break;
                case 409:
                    exceptionPayload = {
                        name: 'CONFLICT',
                        report: true,
                        silent: true
                    };
                    break;
                case 422:
                    exceptionPayload = {
                        name: 'INVALID_APPLICATION',
                        message: statusErrors[response.status],
                        silent: true
                    };
                    break;
                default:
                    exceptionPayload = {
                        name: response.data.error || 'UNKNOWN_ERROR',
                        message: response.data.error || statusErrors[response.status] || '',
                        report: true
                    };
            }
            throw Exceptions.create(Object.assign({ response,
                action, report: false, silent: false, message: response.data.error || statusErrors[response.status] || '', name: response.data.error }, exceptionPayload));
        }
        const { data } = response;
        response.data = changeCase(data, 'camel');
        return response;
    };
    return {
        request,
        call(method, url, headers = {}, ...rest) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (headers['Authorization']) {
                    request.setHeaders(headers);
                }
                const action = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    let args = [url];
                    if (!isEmpty(rest)) {
                        const filteredRest = Object.values(rest).filter((arg) => arg !== null);
                        args = args.concat(filteredRest);
                    }
                    console.log(`Calling ${method.toUpperCase()} on ${origin}${url} with ${JSON.stringify([...args])}`);
                    let response;
                    response = yield request[method].apply(null, args);
                    return response;
                });
                const response = yield action();
                return observeStatus(response, action);
            });
        }
    };
};
//# sourceMappingURL=api.js.map