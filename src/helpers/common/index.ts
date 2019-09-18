import changeObjectCase from 'change-object-case';
import RNExitApp from 'react-native-exit-app';
import { Linking, Platform } from 'react-native';
import { logError } from '@sl/helpers';

export const changeCase = (data: object, direction: 'snake' | 'camel') => {
  const caseFunction = Array.isArray(data) ? `Array` : `Keys`;
  const options = { recursive: true, arrayRecursive: true };
  return changeObjectCase[`${direction}${caseFunction}`](data, options);
};

export const snakeToCamel = (str: string) => str.replace(/([\-_]\w)/g, (m: string) => m[1].toUpperCase());

export const replaceCharsByPatterns = (sentence: string, patterns: object) => {
  let str: string;
  let modifiedSentence = sentence;

  for (str of Object.keys(patterns)) {
    modifiedSentence = modifiedSentence.replace(new RegExp(str, 'g'), patterns[str]);
  }

  return modifiedSentence;
};

export const exitApp = () => {
  RNExitApp.exitApp();
};

export const dashify = (text: string) =>
  text
    .split('')
    .map((char: string) => (char === ' ' ? ' ' : '-'))
    .join('');

export const openUrl = (url: string) => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      logError(`Don't know how to open URI: ${url}`);
    }
  });
};

export const goToAppStore = async () => {
  const playStoreId = 'com.suryolingo.android';
  const appStoreId = '';
  const appName = 'SuryoLingo';

  openUrl(
    Platform.select({
      android: `https://play.google.com/store/apps/details?id=${playStoreId}`,
      ios: `https://itunes.apple.com/app/${appName}/id${appStoreId}`
    })
  );
};
