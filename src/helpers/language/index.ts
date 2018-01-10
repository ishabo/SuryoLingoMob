import Language from 'config/language';
import { replaceCharsByPatterns } from 'helpers/common';

import { TTargetLangs, TLearnerLangs } from 'services/courses';
interface IGarshoniProps {
  sentence: string;
  sentenceLang: TLearnerLangs & TTargetLangs;
  targetLang: TLearnerLangs & TTargetLangs;
  advanced?: boolean;
}

export const toGarshoni = ({ sentence, targetLang, sentenceLang, advanced }: IGarshoniProps) => {
  const langToLang = `${sentenceLang}-to-${targetLang}`.toLowerCase();

  let transliteration = sentence;

  if (advanced) {
    transliteration = replaceCharsByPatterns(
      transliteration,
      Language.garshoni[`${langToLang}-combos`],
    );
  }

  const sentenceArr = transliteration.split('');
  const letters = Language.garshoni[langToLang];

  transliteration = sentenceArr.map((char: string) => {
    let newChar;

    if (letters[char] !== undefined) {
      newChar = char === ' ' ? ' ' : letters[char];
    } else {
      newChar = char;
    }

    return newChar;
  }).join('');

  return transliteration;
};
