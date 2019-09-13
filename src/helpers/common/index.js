import * as tslib_1 from "tslib";
import changeObjectCase from 'change-object-case';
import RNExitApp from 'react-native-exit-app';
import { Linking, Platform } from 'react-native';
import { logError } from 'helpers';
export const changeCase = (data, direction) => {
    const caseFunction = Array.isArray(data) ? `Array` : `Keys`;
    const options = { recursive: true, arrayRecursive: true };
    return changeObjectCase[`${direction}${caseFunction}`](data, options);
};
export const snakeToCamel = (str) => str.replace(/([\-_]\w)/g, (m) => m[1].toUpperCase());
export const replaceCharsByPatterns = (sentence, patterns) => {
    let str;
    let modifiedSentence = sentence;
    for (str of Object.keys(patterns)) {
        modifiedSentence = modifiedSentence.replace(new RegExp(str, 'g'), patterns[str]);
    }
    return modifiedSentence;
};
export const exitApp = () => {
    RNExitApp.exitApp();
};
export const dashify = (text) => text
    .split('')
    .map((char) => (char === ' ' ? ' ' : '-'))
    .join('');
export const openUrl = (url) => {
    Linking.canOpenURL(url).then(supported => {
        if (supported) {
            Linking.openURL(url);
        }
        else {
            logError(`Don't know how to open URI: ${url}`);
        }
    });
};
export const goToAppStore = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const playStoreId = 'com.suryolingo.android';
    const appStoreId = '';
    const appName = 'SuryoLingo';
    openUrl(Platform.select({
        android: `https://play.google.com/store/apps/details?id=${playStoreId}`,
        ios: `https://itunes.apple.com/app/${appName}/id${appStoreId}`
    }));
});
//# sourceMappingURL=index.js.map