declare module 'react-native-sound';


interface IDictionary<K extends number | string, T = number | string> {
  [key: K]: T;
}
