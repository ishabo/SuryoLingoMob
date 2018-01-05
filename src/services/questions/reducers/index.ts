import { types, TQuestionType } from '../actions';
import { IQuestions, IQuestion, IQuestionsAction } from '../';

export const initialState: IQuestions = {
  items: [],
  pendingQuestions: [],
  passedQuestions: [],
  failedQuestions: [],
};

const filterOut = (array: string[], element: string) =>
  array.filter((id: string) => id !== element);

const updateQuestionStatusState = (
  state: IQuestions, status: TQuestionType, questionId: string,
) => {
  const pendingQuestions = filterOut(state.pendingQuestions, questionId);
  const failedQuestions = filterOut(state.failedQuestions, questionId);
  const passedQuestions = [...state.passedQuestions];
  switch (status) {
    case 'passed':
      passedQuestions.push(questionId);
      break;
    case 'failed':
      failedQuestions.push(questionId);
      pendingQuestions.push(questionId);
      break;
  }

  const newState = { ...state, passedQuestions, pendingQuestions, failedQuestions };
  return newState;
};

const splitStringToArray = (str: string | string[]) => {
  if (typeof str === 'string') {
    return str.length > 0 ? str.split('|') : [];
  }
  return str;
};

export const reducer = (state: IQuestions = initialState, action: IQuestionsAction) => {
  switch (action.type) {
    case types.SAVE_QUESTIONS:
      const freshState = { ...initialState };
      const { payload } = action;

      payload.map((question: IQuestion) => {
        question.otherCorrectAnswers = splitStringToArray(question.otherCorrectAnswers);
        question.incorrectChoices = splitStringToArray(question.incorrectChoices);
        return question;
      });

      freshState.items = payload;
      freshState.pendingQuestions = payload.map((question: IQuestion) => question.id);
      return freshState;
    case types.UPDATE_QUESTION_STATUS:
      return updateQuestionStatusState({ ...state }, action.status, action.questionId);
    case types.RESET_QUESTIONS:
      return initialState;
    default:
      return state;
  }
};

