import { API_VERSION, API_DOMAIN } from 'react-native-dotenv';

export default {
  locale: 'ar',
  apiHost: `${API_DOMAIN}/v${API_VERSION}`,
  lessonXP: 100,
  sInfoOptions: {
    keychainService: 'SuryoLingoKeyChain',
    sharedPreferencesName: 'SuryoLingoKeyPrefs',
  },
  validation: {
    emailPatterns: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i],
    namePatterns: [/^[\u0600-\u06FF\s]{3,20}$/i, /^[A-Z\s]{3,20}$/i],
    passwordPatterns: [/^(?=.*[\D])(?=.*\d)[\D\d]{6,18}$/i],
  },
  alerts: {
    NETWORK_ERROR: {
      alertType: 'error',
    },
    UNKNOWN_ERROR: {
      alertType: 'error',
    },
    INTERNAL_SERVER_ERROR: {
      alertType: 'error',
    },
    TIMEOUT_ERROR: {
      alertType: 'error',
    },
    NOT_FOUND: {
      alertType: 'error',
    },
    BAD_REQUEST: {
      alertType: 'warning',
    },
    INVALID_TOKEN: {
      alertType: 'warning',
    },
    INVALID_AUTH: {
      alertType: 'warning',
    },
    INVALID_APPLICATION: {
      alertType: 'warning',
    },
  },
};
