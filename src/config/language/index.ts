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
      ܐ: 'ا', ܒ: 'ب', ܓ: 'ج', ܓ̥: 'غ', ܕ: 'د', ܗ: 'ه',
      ܘ: 'و', ܙ: 'ز', ܚ: 'ح', ܛ: 'ط', ܝ: 'ي', ܟ: 'ك', ܠ: 'ل',
      ܡ: 'م', ܢ: 'ن', ܣ: 'س', ܥ: 'ع', ܦ: 'ف', ܨ: 'ص', ܩ: 'ق',
      ܪ: 'ر', ܫ: 'ش', ܬ: 'ت',
    },

    'cl-syr-to-cl-ara-cleanup': {
      '݂': '̥', '݁': '̊',
      'ܱ': 'ܰ', 'ܴ': 'ܳ', 'ܷ': 'ܶ', 'ܻ': 'ܺ', 'ܾ': 'ܽ',
    },

    'cl-syr-to-cl-ara-combos': {
      ' ܐ̱ܢܳܐ': '-نُا',
      ' ܐ̱ܢܐ': '-نُا',
      ܗ̄ܝ̈: '', ܗ̄ܝ: '',

      // أولف
      ܐܰ: 'آ', ܐܳ: 'أُ', ܐܶ: 'إِ', ܐܺ: 'إٍ', ܐܽ: 'أٌ',

      // بيث مقشاة ومركخة
      ܒ̥: 'ب', ܒ̥ܰ: 'بَ', ܒ̥ܳ: 'بُ', ܒ̥ܶ: 'بِ', ܒ̥ܺ: 'بٍ', ܒ̥ܽ: 'بٌ',
      ܒ̊: 'ڤ', ܒ̊ܰ: 'ڤَ', ܒ̊ܳ: 'ڤُ', ܒ̊ܶ: 'ڤِ', ܒ̊ܺ: 'ڤٍ', ܒ̊ܽ: 'ڤٌ',

      // جومل مقشاة ومركخة
      ܓ̥: 'غ', ܓ̥ܰ: 'غَ', ܓ̥ܳ: 'غُ', ܓ̥ܶ: 'غِ', ܓ̥ܺ: 'غٍ', ܓ̥ܽ: 'غٌ',
      ܓ̊: 'ج', ܓ̊ܰ: 'جَ', ܓ̊ܳ: 'جُ', ܓ̊ܶ: 'جِ', ܓ̊ܺ: 'جٍ', ܓ̊ܽ: 'جٌ',

      // دولاذ مقشاة ومركخة
      ܕ̥: 'ذ', ܕ̥ܰ: 'ذَ', ܕ̥ܳ: 'ذُ', ܕ̥ܶ: 'ذِ', ܕ̥ܺ: 'ذٍ', ܕ̥ܽ: 'ذٌ',
      ܕ̊: 'د', ܕ̊ܰ: 'دَ', ܕ̊ܳ: 'دُ', ܕ̊ܶ: 'دِ', ܕ̊ܺ: 'دٍ', ܕ̊ܽ: 'دٌ',

      // هِا 
      ܗܰ: 'هَ', ܗܳ: 'هُ', ܗܶ: 'هِ', ܗܺ: 'هٍ', ܗܽ: 'هٌ',

      // واو
      ܘܰ: 'وَ', ܘܳ: 'وُ', ܘܶ: 'وِ', ܘܺ: 'وٍ', ܘܽ: 'وٌ',

      // زين
      ܙܰ: 'زَ', ܙܳ: 'زً', ܙܶ: 'زِ', ܙܺ: 'زٍ', ܙܽ: 'زٌ',

      // حيط
      ܚܰ: 'حَ', ܚܳ: 'حُ', ܚܶ: 'حِ', ܚܺ: 'حٍ', ܚܽ: 'حٌ',

      // طيث
      ܛܰ: 'طَ', ܛܳ: 'طُ', ܛܶ: 'طِ', ܛܺ: 'طٍ', ܛܽ: 'طٌ',

      // يوث
      ܝܰ: 'يَ', ܝܳ: 'يُ', ܝܶ: 'يِ', ܝܺ: 'يٍ', ܝܽ: 'يٌ',

      // كوف مقشاة ومركخة
      ܟ̊: 'ك', ܟ̊ܰ: 'كَ', ܟ̊ܳ: 'كُ', ܟ̊ܶ: 'كِ', ܟ̊ܺ: 'كٍ', ܟ̊ܽ: 'كٌ',
      ܟ̥: 'خ', ܟ̥ܰ: 'خَ', ܟ̥ܳ: 'خُ', ܟ̥ܶ: 'خِ', ܟ̥ܺ: 'خٍ', ܟ̥̥ܽ: 'خٌ',

      // لومذ
      ܠܰ: 'لَ', ܠܳ: 'لُ', ܠܶ: 'لِ', ܠܺ: 'لٍ', ܠܽ: 'لٌ',

      // ميم
      ܡܰ: 'مَ', ܡܳ: 'مُ', ܡܶ: 'مِ', ܡܺ: 'مٍ', ܡܽ: 'مٌ',

      // نون
      ܢܰ: 'نَ', ܢܳ: 'نُ', ܢܶ: 'نِ', ܢܺ: 'نٍ', ܢܽ: 'نٌ',

      // سيمكث
      ܣܰ: 'سَ', ܣܳ: 'سُ', ܣܶ: 'سِ', ܣܺ: 'سٍ', ܣܽ: 'سٌ',

      // عِا
      ܥܰ: 'عَ', ܥܳ: 'عُ', ܥܶ: 'عِ', ܥܺ: 'عٍ', ܥܽ: 'عٌ',

      // فِا مقشاة ومركخة
      ܦ̊: 'فّ', ܦ̊ܰ: 'فَّ', ܦ̊ܳ: 'فُّ', ܦ̊ܶ: 'فِّ', ܦ̊ܺ: 'فٍّ', ܦ̊ܽ: 'فٌّ',
      ܦ̥: 'ف', ܦ̥ܰ: 'فَ', ܦ̥ܳ: 'فُ', ܦ̥ܶ: 'فِ', ܦ̥ܺ: 'فٍ', ܦ̥ܽ: 'فٌ',

      // صودي
      ܨܰ: 'صَ', ܨܳ: 'صُ', ܨܶ: 'صِ', ܨܺ: 'صٍ', ܨܽ: 'صٌ',

      // قوف
      ܩܰ: 'قَ', ܩܳ: 'قُ', ܩܶ: 'قِ', ܩܺ: 'قٍ', ܩܽ: 'قٌ',

      // ريش
      ܪܰ: 'رَ', ܪܳ: 'رُ', ܪܶ: 'رِ', ܪܺ: 'رٍ', ܪܽ: 'رٌ',

      // شين
      ܫܰ: 'شَ', ܫܳ: 'شُ', ܫܶ: 'شِ', ܫܺ: 'شٍ', ܫܽ: 'شٌ',

      // تاو مقشاة ومركخة
      ܬ̊: 'ت', ܬ̊ܳ: 'تُ', ܬ̊ܰ: 'تَ', ܬ̊ܶ: 'تِ', ܬ̊ܺ: 'تٍ',
      ܬ̥: 'ث', ܬ̥ܰ: 'ثَ', ܬ̥ܳ: 'ثُ', ܬ̥ܶ: 'ثِ', ܬ̥ܺ: 'ثٍ', ܬ̥ܽ: 'ثٌ',

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
