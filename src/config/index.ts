import { API_VERSION, HOST } from 'react-native-dotenv';

export default {
  locale: 'ar',
  syriacVowels: {
    ftoho: 'ܰ', // 
    zqofo: 'ܳ',
    rboso: 'ܶ', // Rboso
    '3soso': 'ܽ', // 3soso
    '7boso': 'ܺ', // 7boso
  },
  arabicVowels: {
    fat7a: 'َ', // Fat7a
    damma: 'ُ', // Damma
    kasra: 'ِ', // Kasra
    sukoun: 'ْ', // Sukun
    tanweenFat7: 'ً', // Tanween fat7
    tanweenDam: 'ٌ', // Tanween dam
    tanweenKasr: 'ٍ', // Tanween kasr
  },
  garshoni: {
    'cl-ara-to-cl-syr': {
      ا: 'ܐ',
      إ: 'ܐ',
      أ: 'ܐ',
      آ: 'ܐ',
      ب: 'ܒ',
      ت: 'ܬ',
      ث: 'ܬ̥',
      ج: 'ܔ',
      ح: 'ܚ',
      خ: 'ܟ̥',
      د: 'ܕ',
      ذ: 'ܕ̊',
      ر: 'ܪ',
      ز: 'ܙ',
      س: 'ܣ',
      ش: 'ܫ',
      ص: 'ܨ',
      ض: 'ܨ̊',
      ط: 'ܛ',
      ظ: 'ܜ',
      ع: 'ܥ',
      غ: 'ܓ̥',
      ف: 'ܦ',
      ق: 'ܩ',
      ك: 'ܟ',
      ل: 'ܠ',
      م: 'ܡ',
      ن: 'ܢ',
      ه: 'ܗ',
      و: 'ܘ',
      ي: 'ܝ',
      ى: 'ܝ̱',
      ؤ: 'ܘ',
      ئ: 'ܐ',
      ء: 'ܐ',
      ة: 'ܗ̈',
    },
    'cl-syr-to-cl-ara': {
      ܐ: 'ا',
      ܐ̱: null,
      ܒ: 'ب',
      ܒ̥: 'ڤ‎',
      ܓ: 'چ',
      ܓ̥: 'غ',
      ܕ: 'د',
      ܕ̥: 'ذ',
      ܗ: 'ه',
      ܗ̱: null,
      ܘ: 'و',
      ܙ: 'ز',
      ܚ: 'ح',
      ܛ: 'ط',
      ܝ: 'ي',
      ܟ: 'ك',
      ܟ̥: 'خ',
      ܠ: 'ل',
      ܡ: 'م',
      ܢ: 'ن',
      ܢ̱: null,
      ܣ: 'س',
      ܥ: 'ع',
      ܦ: 'ف',
      ܦ̥: 'ﭗ',
      ܨ: 'ص',
      ܩ: 'ق',
      ܪ: 'ر',
      ܫ: 'ش',
      ܬ: 'ت',
      ܬ̥: 'ث',
      'ܰ': 'َ',
      'ܳ': 'ُ',
      'ܶ': 'ِ',
      'ܺ': 'ٍ',
      'ٌ': 'ܽ',
      '̱': null,
    },
  },
  syriacLetters: [
    'ܐ', 'ܒ', 'ܓ', 'ܕ', 'ܗ', 'ܘ', 'ܙ', 'ܚ', 'ܛ', 'ܝ', 'ܟ', 'ܠ',
    'ܡ', 'ܢ', 'ܣ', 'ܥ', 'ܦ', 'ܨ', 'ܩ', 'ܪ', 'ܫ', 'ܬ',
  ],
  arabicLetters: ['ا', 'إ', 'أ', 'آ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر',
    'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م',
    'ن', 'ه', 'و', 'ي', 'ى‎', 'ؤ‎', 'ئ‎', 'ء‎', 'ة',
  ],
  apiHost: `${HOST}/v${API_VERSION}`,
  lessonXP: 100,
  repeatedLessonXP: 50,
  sInfoOptions: {
    keychainService: 'SuryoLingoKeyChain',
    sharedPreferencesName: 'SuryoLingoKeyPrefs',
  },
};

