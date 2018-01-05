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
    bold: 'RasheeqBold',
    regular: 'RasheeqRegular',
  },
};

export const getFont = (lang: TLangs, fontType?: 'bold' | 'regular') => {
  try {
    return fonts[lang][fontType ? fontType : 'regular'];
  } catch (_) {
    console.warn(lang);
  }
  return 'SertoRegular';
};
