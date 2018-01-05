import { IQuestions, IQuestion } from '../';
import { isReverseQuestion } from 'helpers';

export const getPendingQuestions = (state: IQuestions) => state.pendingQuestions;

export const calcProress = (state: IQuestions): number =>
  1 - (state.pendingQuestions.length / state.items.length);

export const getCurrentQuestion = (state: IQuestions): IQuestion =>
  state.items.filter((question: IQuestion) => question.id === state.pendingQuestions[0])[0];

export const allCorrectAnswers = (state: IQuestions, questionId: string): string[] => {
  const question = state.items.filter((question: IQuestion) => question.id === questionId)[0];
  const mainAnswer = isReverseQuestion(question.questionType)
    ? question.phrase
    : question.translation;

  return [mainAnswer].concat(question.otherCorrectAnswers);
};
