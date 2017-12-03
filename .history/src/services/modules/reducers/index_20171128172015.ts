import { types } from '../actions';

export type TQuestionType = string | 'TRANSLATION' | 'WORD_SELECTION'
  | 'MULTI_CHOICE' | 'PICTURE_SELETION' | 'DICTATION';

export interface IStudyPhrase { text: string; soundFile?: string; }

export interface IQuestion {
  id: string;
  lessonId: string;
  questionType: TQuestionType;
  studyPhrase: IStudyPhrase;
  correctAnswers: string | string[];
  possibleAnswers?: string | string[];
  translateTo: string | 'targetLanguage' | 'learnerLanguage';
}

export interface ILesson {
  id: string;
  moduleId: string;
  newWords: string[];
  questions: IQuestion[];
}

export interface IModule {
  id: string;
  courseId: string;
  level: number;
  unit: number;
  name: string;
  lessons: ILesson[];
  icons: {
    inactive: string;
    active: string;
    completed: string;
  };
}

export interface IModuleAction {
  type: string;
  payload: IModule[];
}

export const initialState: IModule[] = [];

export default function (state: IModule[] = initialState, action: IModuleAction) {
  switch (action.type) {
    case types.SAVE_MODULES:
      return action.payload;
    default:
      return state;
  }
}
