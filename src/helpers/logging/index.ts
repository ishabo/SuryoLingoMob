import crashlytics from '@react-native-firebase/crashlytics'

export const logError = (error: string) => {
  console.warn('-->', error)
  try {
    return crashlytics().recordError(new Error(error))
    // return console.warn;
  } catch (e) {
    return console.warn
  }
}
