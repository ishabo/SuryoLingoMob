declare module 'react-native-sound';


interface IDictionary<K extends number & string, T extends number & string> {
  [key: K]: T;
}
