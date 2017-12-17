export * from './evaluation';
export * from './audio';
export * from './navigation';

import { TQuestionType } from '../services/questions/actions/index';

export const isReverseQuestion = (questionType: TQuestionType) =>
    /_REVERSE$/.test(questionType);
