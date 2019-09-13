const EstrangeloEdessa = 'Serto Urhoy';
const HelveticaNeue = 'Al-Jazeera-Arabic-Regular';
const fonts = {
    'cl-syr': {
        bold: EstrangeloEdessa,
        regular: EstrangeloEdessa
    },
    'tur-syr': {
        bold: EstrangeloEdessa,
        regular: EstrangeloEdessa
    },
    'cl-ara': {
        bold: HelveticaNeue,
        regular: HelveticaNeue
    }
};
export const getFont = (lang, fontType) => {
    try {
        return fonts[lang][fontType ? fontType : 'regular'];
    }
    catch (_) {
        console.warn(lang);
        return fonts['cl-ara']['regular'];
    }
};
//# sourceMappingURL=index.js.map