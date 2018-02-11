const language = {
  syriacVowels: {},
  arabicVowels: {
    fat7a: 'َ', // Fat7a
    damma: 'ُ', // Damma
    kasra: 'ِ', // Kasra
    sukoun: 'ْ', // Sukun
    tanweenFat7: 'ً', // Tanween fat7
    tanweenDam: 'ٌ', // Tanween dam
    tanweenKasr: 'ٍ', // Tanween kasr
  },
  syriacLetters: [
    'ܐ', 'ܒ', 'ܓ', 'ܕ', 'ܗ', 'ܘ', 'ܙ', 'ܚ', 'ܛ', 'ܝ', 'ܟ', 'ܠ',
    'ܡ', 'ܢ', 'ܣ', 'ܥ', 'ܦ', 'ܨ', 'ܩ', 'ܪ', 'ܫ', 'ܬ',
  ],
  arabicLetters: [
    'ا', 'إ', 'أ', 'آ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر',
    'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م',
    'ن', 'ه', 'و', 'ي', 'ى‎', 'ؤ‎', 'ئ‎', 'ء‎', 'ة',
  ],
  arabicLettersToOverlook: {
    أ: 'ا', إ: 'ا', آ: 'ا', ة: 'ه',
  },
  syriacLettersToOverlook: {},
  garshoni: {
    'cl-ara-to-cl-syr': {
      ا: 'ܐ', إ: 'ܐ', أ: 'ܐ', آ: 'ܐ', ب: 'ܒ', ت: 'ܬ', ث: 'ܬ̥',
      ج: 'ܓ', ح: 'ܚ', خ: 'ܟ̥', د: 'ܕ', ذ: 'ܕ̊',
      ر: 'ܪ', ز: 'ܙ', س: 'ܣ', ش: 'ܫ', ص: 'ܨ', ض: 'ܨ̊', ط: 'ܛ', ظ: 'ܜ',
      ع: 'ܥ', غ: 'ܓ̥', ف: 'ܦ', ق: 'ܩ', ك: 'ܟ', ل: 'ܠ', م: 'ܡ', ن: 'ܢ', ه: 'ܗ', و: 'ܘ',
      ي: 'ܝ', ى: 'ܝ̱', ؤ: 'ܘ', ئ: 'ܐ', ء: 'ܐ', ة: 'ܗ̈',
    },
    'cl-syr-to-cl-ara': {
      ܐ: 'ا', ܒ: 'ب', ܓ: 'چ', ܓ̥: 'غ', ܕ: 'د', ܗ: 'ه',
      ܘ: 'و', ܙ: 'ز', ܚ: 'ح', ܛ: 'ط', ܝ: 'ي', ܟ: 'ك', ܠ: 'ل',
      ܡ: 'م', ܢ: 'ن', ܣ: 'س', ܥ: 'ع', ܦ: 'ف', ܨ: 'ص', ܩ: 'ق',
      ܪ: 'ر', ܫ: 'ش', ܬ: 'ت',
    },
    'cl-syr-to-cl-ara-combos': {
      ' ܐ̱ܢܳܐ': '-نُا',
      ' ܐ̱ܢܐ': '-نُا',
      ܗ̄ܝ̈: '', ܗ̄ܝ: '',
      ܬ݁: 'ت', ܦ݁: 'ﭗ', ܟ݁: 'ك', ܕ݁: 'د', ܒ݁: 'ب',
      ܬ݂: 'ث', ܦ݂: 'ف', ܟ݂: 'خ', ܕ݂: 'ذ', ܒ݂: 'ڤ‎',
      ܗ̱: '', ܗ̄: '', ܢ̱: '',
      ܐ̱: '', ܝ̱: '',
    },
    'cl-ara-to-cl-syr-combos': {},
  },
};

const V_FTOHO = 'ܰ'; const V_ZQOFO = 'ܳ'; const V_RBOSO = 'ܶ';
const V_3SOSO = 'ܽ'; const V_7BOSO = 'ܺ'; const V_FTOHO_ = 'ܱ';
const V_ZQOFO_ = 'ܴ'; const V_RBOSO_ = 'ܷ'; const V_3SOSO_ = 'ܾ';
const V_7BOSO_ = 'ܻ'; const V_MBATLONO = '̱'; const V_NUQTAIN = '̱';

language['syriacVowels']['V_FTOHO'] = V_FTOHO;
language['syriacVowels']['V_ZQOFO'] = V_ZQOFO;
language['syriacVowels']['V_RBOSO'] = V_RBOSO;
language['syriacVowels']['V_3SOSO'] = V_3SOSO;
language['syriacVowels']['V_7BOSO'] = V_7BOSO;

const syr2ara = 'cl-syr-to-cl-ara';

language.garshoni[syr2ara][V_FTOHO] = language.arabicVowels.fat7a;
language.garshoni[syr2ara][V_ZQOFO] = language.arabicVowels.damma;
language.garshoni[syr2ara][V_RBOSO] = language.arabicVowels.kasra;
language.garshoni[syr2ara][V_3SOSO] = language.arabicVowels.tanweenDam;
language.garshoni[syr2ara][V_7BOSO] = language.arabicVowels.tanweenKasr;
language.garshoni[syr2ara][V_FTOHO_] = language.arabicVowels.fat7a;
language.garshoni[syr2ara][V_ZQOFO_] = language.arabicVowels.damma;
language.garshoni[syr2ara][V_RBOSO_] = language.arabicVowels.kasra;
language.garshoni[syr2ara][V_3SOSO_] = language.arabicVowels.tanweenDam;
language.garshoni[syr2ara][V_7BOSO_] = language.arabicVowels.tanweenKasr;
language.garshoni[syr2ara][V_MBATLONO] = V_MBATLONO;
language.garshoni[syr2ara][V_NUQTAIN] = null;

// Set shortnames

interface ILangConfig {
  letters: string[];
  vowels: string[];
  overlookLetters: IDictionary<string>;
}

language['cl-syr'] = language['tor-syr'] = {
  letters: language.syriacLetters,
  vowels: language.syriacVowels,
  overlookLetters: language.arabicLettersToOverlook,
};

language['cl-ara'] = {
  letters: language.arabicLetters,
  vowels: language.arabicVowels,
  overlookLetters: language.syriacLettersToOverlook,
};

export const getLangConfig = (lang: TLangs): ILangConfig => language[lang];

export default language;
