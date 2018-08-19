const language = {
  syriac: {
    langId: 'cl-syr',
    letters: [
      'ܐ',
      'ܒ',
      'ܓ',
      'ܕ',
      'ܗ',
      'ܘ',
      'ܙ',
      'ܚ',
      'ܛ',
      'ܝ',
      'ܟ',
      'ܠ',
      'ܡ',
      'ܢ',
      'ܣ',
      'ܥ',
      'ܦ',
      'ܨ',
      'ܩ',
      'ܪ',
      'ܫ',
      'ܬ'
    ],
    vowels: {
      fto7o: 'ܰ',
      zqofo: 'ܳ',
      '7boso': 'ܺ',
      '3soso': 'ܶ',
      rboso: 'ܽ'
    },
    overlookLetters: {},
    keyboardKeys: []
  },

  arabic: {
    langId: 'cl-ara',
    letters: [
      'ا',
      'إ',
      'أ',
      'آ',
      'ب',
      'ت',
      'ث',
      'ج',
      'ح',
      'خ',
      'د',
      'ذ',
      'ر',
      'ز',
      'س',
      'ش',
      'ص',
      'ض',
      'ط',
      'ظ',
      'ع',
      'غ',
      'ف',
      'ق',
      'ك',
      'ل',
      'م',
      'ن',
      'ه',
      'و',
      'ي',
      'ى‎',
      'ؤ‎',
      'ئ‎',
      'ء‎',
      'ة'
    ],
    vowels: {
      fat7a: 'َ',
      damma: 'ُ',
      kasra: 'ِ',
      sukoun: 'ْ',
      tanweenFat7: 'ً',
      tanweenDam: 'ٌ',
      tanweenKasr: 'ٍ'
    },
    overlookLetters: {
      أ: 'ا',
      إ: 'ا',
      آ: 'ا',
      ة: 'ه'
    },
    keyboardKeys: [
      'ا',
      'ب',
      'ت',
      'ث',
      'ج',
      'ح',
      'خ',
      'د',
      'ذ',
      'ر',
      'ز',
      'س',
      'ش',
      'ص',
      'ض',
      'ط',
      'ظ',
      'ع',
      'غ',
      'ف',
      'ق',
      'ك',
      'ل',
      'م',
      'ن',
      'ه',
      'و',
      'ي',
      'ى‎',
      'ؤ‎',
      'ئ‎',
      'ء‎',
      'ة'
    ]
  }
};

interface ILangConfig {
  keyboardKeys: string[];
  letters: string[];
  vowels: string[];
  overlookLetters: IDictionary<string>;
}

language['cl-syr'] = language['tur-syr'] = {
  letters: language.syriac.letters,
  vowels: language.syriac.vowels,
  overlookLetters: language.syriac.overlookLetters,
  keyboardKeys: language.syriac.letters
};

language['cl-ara'] = {
  letters: language.arabic.letters,
  vowels: language.arabic.vowels,
  overlookLetters: language.arabic.overlookLetters,
  keyboardKeys: language.arabic.keyboardKeys
};

export const getLangConfig = (lang: TLangs): ILangConfig => language[lang];

export default language;
