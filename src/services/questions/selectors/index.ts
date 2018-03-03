import { IQuestions, IQuestion } from '../';
import { isReverseQuestion } from 'helpers';

export const getPending = (state: IQuestions) => state.pending;

export const calcProress = (state: IQuestions): number =>
  1 - (state.pending.length / state.onGoing.length);

export const getCurrentQuestion = (state: IQuestions): IQuestion =>
  state.onGoing.filter((question: IQuestion) => question.id === state.pending[0])[0];

export const allCorrectAnswers = (state: IQuestions, questionId: string): string[] => {
  const question = state.onGoing.filter((question: IQuestion) => question.id === questionId)[0];
  const mainAnswer = isReverseQuestion(question.questionType)
    ? question.phrase
    : question.translation;

  return [mainAnswer].concat(question.otherCorrectAnswers);
};
