import { Platform } from 'react-native';
import Fabric from 'react-native-fabric';
const { Crashlytics } = Fabric;

export const logError = error => {
  console.warn(error);
  return Platform.OS === 'android' ? Crashlytics.logException(error) : Crashlytics.recordError(error);
};
