const EstrangeloEdessa = 'Serto Urhoy';
const Aljazeera = 'Al-Jazeera-Arabic-Regular';

const fonts = {
  'cl-syr': {
    bold: EstrangeloEdessa,
    regular: EstrangeloEdessa,
  },
  'tur-syr': {
    bold: EstrangeloEdessa,
    regular: EstrangeloEdessa,
  },
  'cl-ara': {
    bold: Aljazeera,
    regular: Aljazeera,
  },
};

export const getFont = (lang: TLangs, fontType?: 'bold' | 'regular') => {
  try {
    return fonts[lang][fontType ? fontType : 'regular'];
  } catch (_) {
    console.warn(lang);
    return fonts['cl-ara']['regular'];
  }
};
