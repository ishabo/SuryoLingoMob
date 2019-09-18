import I18n from 'react-native-i18n';
import ar from './locales/ar';
import en from './locales/en';
import Config from '@sl/config/';

I18n.fallbacks = false;

I18n.translations = {
  ar, en,
};

I18n.locale = Config.locale;

export default I18n;
