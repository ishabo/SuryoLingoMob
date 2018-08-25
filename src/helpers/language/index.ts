import language from 'config/language';

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
