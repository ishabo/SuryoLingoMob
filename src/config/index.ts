import { API_VERSION, HOST } from 'react-native-dotenv';

export default {
  locale: 'ar',
  apiHost: `${HOST}/v${API_VERSION}`,
  lessonXP: 100,
  repeatedLessonXP: 50,
  sInfoOptions: {
    keychainService: 'SuryoLingoKeyChain',
    sharedPreferencesName: 'SuryoLingoKeyPrefs',
  },
};
