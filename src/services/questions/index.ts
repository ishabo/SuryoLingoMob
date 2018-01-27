import * as reducers from './reducers';
import * as actions from './actions';
import * as selectors from './selectors';
import * as sagas from './sagas';
import * as api from './api';

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
  skillId?: string;
  status?: TQuestionType;
  payload?: IQuestion[];
}

export interface IQuestions {
  all: IQuestion[];
  onGoing: IQuestion[];
  pending: string[];
  passed: string[];
  failed: string[];
}

export {
  api,
  actions,
  reducers,
  selectors,
  sagas,
};
