import * as tslib_1 from "tslib";
import SInfo from 'react-native-sensitive-info';
import Config from 'config';
export const getAccessToken = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const accessToken = yield SInfo.getItem('accessToken', Config.sInfoOptions);
    return accessToken;
});
export const setAccessToken = (token) => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield SInfo.setItem('accessToken', token, Config.sInfoOptions); });
export const deleteAccessToken = () => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield SInfo.deleteItem('accessToken', Config.sInfoOptions); });
//# sourceMappingURL=access.js.map