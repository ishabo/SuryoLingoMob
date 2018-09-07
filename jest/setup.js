console.tron = {
  log: () => {},
  error: () => {},
  warn: () => {}
};

jest.mock('react-native-sound', () => 'Sound');
jest.mock('react-native-exit-app', () => 'RNExitApp');
const RNExitApp = require('react-native-exit-app');
RNExitApp.exitApp = jest.fn();

// jest.mock('react-native-fs', () => jest.fn());
