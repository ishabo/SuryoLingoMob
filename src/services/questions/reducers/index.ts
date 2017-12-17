import { types, TQuestionType } from '../actions';

export type TQuestionType = string | 'NEW_WORD_OR_PHRASE'
  | 'TRANSLATION' | 'TRANSLATION_REVERSE'
  | 'WORD_SELECTION' | 'WORD_SELECTION_REVERSE'
  | 'MULTI_CHOICE' | 'MULTI_CHOICE_REVERSE'
  | 'PICTURE_SELECTION' | 'DICTATION';

export interface IQuestion {
  id: string;
  lessonId: string;
  questionType: TQuestionType;
  phrase: string;
  soundFiles: string[];
  translation: string;
  otherCorrectAnswers?: string[];
  incorrectChoices?: string[];
}

export interface IQuestionsAction {
  type: string;
  questionId?: string;
  lessonId?: string;
  status?: TQuestionType;
  payload?: IQuestion[];
}

export interface IQuestions {
  items: IQuestion[];
  pendingQuestions: string[];
  passedQuestions: string[];
  failedQuestions: string[];
}

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

