export * from './evaluation';
export * from './navigation';
export * from './audio';
import Config from 'config/';
import changeObjectCase from 'change-object-case';

import { TQuestionType } from 'services/questions/actions/index';
import { TTargetLangs, TLearnerLangs } from 'services/courses';
import { IDictionary } from 'services/dictionaries';

export const isReverseQuestion = (questionType: TQuestionType) =>
  /_REVERSE$/.test(questionType) || questionType === 'DICTATION';

interface IGarshoniProps {
  sentence: string;
  sentenceLang: TLearnerLangs & TTargetLangs;
  targetLang: TLearnerLangs & TTargetLangs;
}

export const toGarshoni = ({ sentence, targetLang, sentenceLang }: IGarshoniProps) => {
  const sentenceArr = sentence.split('');
  const letters = Config.garshoni[`${sentenceLang}-to-${targetLang}`];

  const transliteration = sentenceArr.map((char: string) => {
    const newChar = char === ' ' ? ' ' : letters[char];

    return newChar;
  }).join('');
  return transliteration;
};

export interface IWordHint {
  word: string;
  translations?: string;
}

export const hintify = (sentence: string, hints: IDictionary[]): IWordHint[] => {
  const words = sentence.split(' ');
  return words.map((word: string) => {
    const hint = hints.find((h: IDictionary) => h.word === word);
    return hint ? hint : { word, translations: null };
  });
};

export const cleanAnswer = (answer: string) => {
  let cleanned = answer.trim();
  cleanned = cleanned.replace(/[!؟.,؟.܀,\?\.]g/, '');
  return cleanned;
};

export const changeCase = (data: object, direction: 'snake' | 'camel') => {
  const caseFunction = Array.isArray(data) ? `Array` : `Keys`;
  const options = { recursive: true, arrayRecursive: true };
  return changeObjectCase[`${direction}${caseFunction}`](data, options);
};
