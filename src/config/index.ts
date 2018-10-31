import { API_DOMAIN, LAMBDA_HOST } from 'react-native-dotenv';
import { Platform } from 'react-native';

const website = () => {
  let domain = API_DOMAIN;

  if (domain && domain.match(/localhost/) && Platform.OS === 'android') {
    domain = domain.replace(/localhost/, '10.0.2.2');
  }

  return domain;
};

const apiHost = `${website()}/api/v2`;
const adminHost = `${website()}/idara`;
const lambdaHost = LAMBDA_HOST;

export default {
  apiHost,
  adminHost,
  lambdaHost,
  locale: 'ar',
  lessonXP: 100,
  sInfoOptions: {
    keychainService: 'SuryoLingoKeyChain',
    sharedPreferencesName: 'SuryoLingoKeyPrefs'
  },
  validation: {
    emailPatterns: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i],
    namePatterns: [/^[\u0600-\u06FF\s]{3,20}$/i, /^[A-Z\s]{3,20}$/i, /^[\u0710-\u0742\s]{3,20}$/i],
    passwordPatterns: [/^(?=.*[\D])(?=.*\d)[\D\d]{6,}$/i]
  },
  alerts: {
    NETWORK_ERROR: {
      alertType: 'error'
    },
    UNKNOWN_ERROR: {
      alertType: 'error'
    },
    INTERNAL_SERVER_ERROR: {
      alertType: 'error'
    },
    TIMEOUT_ERROR: {
      alertType: 'error'
    },
    NOT_FOUND: {
      alertType: 'error'
    },
    BAD_REQUEST: {
      alertType: 'warning'
    },
    INVALID_TOKEN: {
      alertType: 'warning'
    },
    INVALID_AUTH: {
      alertType: 'warning'
    },
    INVALID_APPLICATION: {
      alertType: 'warning'
    }
  }
};
