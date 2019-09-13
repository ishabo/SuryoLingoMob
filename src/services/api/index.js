import * as tslib_1 from "tslib";
export { setApiOrigin, setUserToken } from './api';
import { createApi, getUserToken } from './api';
import { changeCase } from 'helpers';
export const create = (options = {}) => {
    const { baseURL, errors, headers } = options;
    const api = createApi({
        errors,
        headers,
        baseURL
    });
    function makeRequest(method, url, ...args) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                const authorizationHeader = {
                    Authorization: `Token token=${yield getUserToken()}`
                };
                const { data } = yield api.call(method, url, authorizationHeader, ...args);
                response = data.result ? data.result : data;
            }
            catch (e) {
                throw e;
            }
            return response;
        });
    }
    return {
        api,
        call(method, url, ...args) {
            if (method !== 'get' && args[0]) {
                args[0] = changeCase(args[0], 'snake');
            }
            return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield makeRequest(method, url, ...args);
                    resolve(response);
                }
                catch (e) {
                    reject(e);
                }
            }));
        },
        get(...args) {
            return this.call('get', ...args);
        },
        post(...args) {
            return this.call('post', ...args);
        },
        put(...args) {
            return this.call('put', ...args);
        }
    };
};
//# sourceMappingURL=index.js.map