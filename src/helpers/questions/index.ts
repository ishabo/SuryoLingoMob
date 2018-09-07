import { TQuestionType } from 'services/questions/actions/index';
import { IDictionary, IWordHint } from 'services/dictionaries';
import shortid from 'shortid';
import config from '../../config';
import { openUrl } from 'helpers/common';
import { TTargetLangs } from 'services/courses';
import { ignoreByPattern, getLangConfig } from 'helpers/language';

export const isReverseQuestion = (questionType: TQuestionType) =>
  /_REVERSE$/.test(questionType) || questionType === 'DICTATION';

export const hintify = (sentence: string, dictionary: IDictionary[], targetLanguage: TTargetLangs): IWordHint[] => {
  return sentence.split(' ').map((word: string) => {
    const patterns = getLangConfig(targetLanguage).hintPatterns;
    const filteredWord = ignoreByPattern(word, patterns);
    const hint = dictionary.find((d: IDictionary) => ignoreByPattern(d.word, patterns) === filteredWord);
    const key = shortid.generate();

    return hint ? { word, translations: hint.translations, key } : { word, translations: null, key };
  });
};

export const cleanAnswer = (answer: string) => {
  const cleanned = answer.trim();
  return cleanned.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/؟܀٬]/gi, '');
};

export const openPhraseInAdmin = (phrase: string) => {
  const url = `${config.adminHost}/phrases?q[by_phrase]=${phrase}`;
  openUrl(url);
};
