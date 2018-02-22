import { Platform } from 'react-native';

const fonts = {
  'cl-syr': {
    bold: 'SertoRegular',
    regular: 'SertoRegular',
  },
  'tor-syr': {
    bold: 'SertoRegular',
    regular: 'SertoRegular',
  },
  'cl-ara': {
    bold: Platform.OS === 'android' ? 'AljazeeraBold' : 'FontAwesome',
    regular: Platform.OS === 'android' ? 'AljazeeraRegular' : 'FontAwesome',
  },
};

export const getFont = (lang: TLangs, fontType?: 'bold' | 'regular') => {
  try {
    return fonts[lang][fontType ? fontType : 'regular'];
  } catch (_) {
    console.warn(lang);
  }
  return 'AjazeeraRegular';
};
