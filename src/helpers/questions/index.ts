import { TQuestionType } from 'services/questions/actions/index';
import { IDictionary } from 'services/dictionaries';

export const isReverseQuestion = (questionType: TQuestionType) =>
  /_REVERSE$/.test(questionType) || questionType === 'DICTATION';

export interface IWordHint {
  word: string;
  translations?: string;
}

export const hintify = (sentence: string, dictionary: IDictionary[]): IWordHint[] => {
  const words = sentence.split(' ');
  return words.map((word: string) => {
    const hint = dictionary.find((d: IDictionary) => d.word === word);
    return hint ?
      { word: hint.word, translations: hint.translations } :
      { word, translations: null };
  });
};

export const cleanAnswer = (answer: string) => {
  const cleanned = answer.trim();
  return cleanned.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/؟܀٬]/gi, '');
};

