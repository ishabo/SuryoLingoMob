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
  validation: {
    emailPatterns: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i],
    namePatterns: [/^[\u0600-\u06FF\s]{3,20}$/i, /^[A-Z\s]{3,20}$/i],
    passwordPatterns: [/^(?=.*[\D])(?=.*\d)(?=.*[$@$!%*#?&])[\D\d$@$!%*#?&]{6,18}$/i],
  },
};
