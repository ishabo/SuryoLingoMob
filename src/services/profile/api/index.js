import * as tslib_1 from "tslib";
import { create } from 'services/api';
import { injectDeviceInfo } from 'helpers';
export const createProfile = (payload = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    // Creating Profile is the only API call that's done with a default token
    return create().post('/users', yield injectDeviceInfo(payload));
});
export const updateProfile = (id) => (payload = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    return create().put(`/users/${id}`, yield injectDeviceInfo(payload));
});
export const getUser = () => create().get('/users');
//# sourceMappingURL=index.js.map