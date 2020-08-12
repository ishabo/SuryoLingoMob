import I18n from 'react-native-i18n'
import Config from '@sl/config/'
import ar from './locales/ar'
import en from './locales/en'

I18n.fallbacks = false

I18n.translations = {
  ar,
  en,
}

I18n.locale = Config.locale

export default I18n
