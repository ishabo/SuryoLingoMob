import { isReverseQuestion } from 'helpers';
export const getPending = (state) => state.pending;
export const calcProress = (state) => 1 - state.pending.length / state.onGoing.length;
export const getCurrentQuestion = (state) => state.onGoing.filter((question) => question.id === state.pending[0])[0];
export const allCorrectAnswers = (state, questionId) => {
    const question = state.onGoing.filter((question) => question.id === questionId)[0];
    const mainAnswer = isReverseQuestion(question.questionType) ? question.phrase : question.translation;
    return [mainAnswer].concat(question.otherCorrectAnswers);
};
//# sourceMappingURL=index.js.map