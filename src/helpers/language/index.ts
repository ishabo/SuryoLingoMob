import Language from 'config/language';
import { replaceCharsByPatterns } from 'helpers/common';

import { TTargetLangs, TLearnerLangs } from 'services/courses';

interface IGarshoniProps {
  sentence: string;
  sentenceLang: TLearnerLangs & TTargetLangs;
  targetLang: TLearnerLangs & TTargetLangs;
  advanced?: boolean;
}

// TODO: Extract into an independent package
export const toGarshoni = ({ sentence, targetLang, sentenceLang, advanced }: IGarshoniProps) => {
  const langToLang = `${sentenceLang}-to-${targetLang}`.toLowerCase();

  let transliteration = replaceChars(sentence, Language.garshoni[`${langToLang}-cleanup`]);

  if (advanced) {
    transliteration = replaceCharsByPatterns(
      transliteration,
      Language.garshoni[`${langToLang}-combos`],
    );
  }

  return replaceChars(transliteration, Language.garshoni[langToLang]);
};

const replaceChars = (chars: string, letters: IDictionary<string> = {}) =>
  chars.split('').map((char: string) => {
    let newChar;
    try {
      if (letters[char]) {
        newChar = letters[char];
      } else {
        newChar = char;
      }
    } catch (error) {
      console.warn(error);
      newChar = '';
    }
    return newChar;
  }).join('');
