import { Crashlytics } from 'config/firebase';

export const logError = error => {
  console.warn('-->', error);
  try {
    return Crashlytics.recordError(500, error);
    // return console.warn;
  } catch (e) {
    return console.warn;
  }
};
