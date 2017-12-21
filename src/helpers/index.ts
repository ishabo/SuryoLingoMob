export * from './evaluation';
export * from './navigation';
export * from './audio';
import Config from '../config';

import { TQuestionType } from '../services/questions/actions/index';
import { TTargetLangs, TLearnerLangs } from '../services/courses/reducers';

export const isReverseQuestion = (questionType: TQuestionType) =>
  /_REVERSE$/.test(questionType);

interface IProps {
  sentence: string;
  sentenceLang: TLearnerLangs & TTargetLangs;
  targetLang: TLearnerLangs & TTargetLangs;
}

export const toGarshoni = ({ sentence, targetLang, sentenceLang }: IProps) => {
  const sentenceArr = sentence.split('');
  const letters = Config.garshoni[`${sentenceLang}-to-${targetLang}`];

  const transliteration = sentenceArr.map((char: string) => {
    const newChar = char === ' ' ? ' ' : letters[char];

    return newChar;
  }).join('');
  return transliteration;
};
