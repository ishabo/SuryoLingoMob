console.tron = {
  log: () => { },
  error: () => { },
  warn: () => { },
};

jest.mock('react-native-sound', () => 'Sound');
// jest.mock('react-native-fs', () => jest.fn());