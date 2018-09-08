import language, { ILangConfig, IReplacePattern } from 'config/language';

const isOfLanguage = (arr: string[], text: string): boolean => {
  const firstLetter = text[0];
  return arr.includes(firstLetter);
};

export const detectLanguage = (text: string): TLangs => {
  const { syriac, arabic } = language;

  if (isOfLanguage(syriac.letters, text)) {
    return syriac.langId;
  } else if (isOfLanguage(arabic.letters, text)) {
    return arabic.langId;
  } else {
    return arabic.langId;
  }
};

export const getLangConfig = (lang: TLangs): ILangConfig => language[lang];

export const ignoreByPattern = (word: string, patterns: ILangConfig['hintPatterns']) => {
  let pattern: IReplacePattern;
  for (pattern of patterns) {
    word = word.replace(pattern.pattern, pattern.replace);
  }
  return word;
};
