declare module 'react-native-sound';

interface IDictionary<T extends number | string> {
  [k: string]: T;
}

interface IIndex<T extends number | string> {
  [k: number]: T;
}
