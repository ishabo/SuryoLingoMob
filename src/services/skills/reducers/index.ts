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
  skillId: string;
  newWords: string[];
}

export interface ISkill {
  id: string;
  courseId: string;
  unit: number;
  name: string;
  lessons: ILesson[];
  icon: string;
}

export interface ISkillsAction {
  type: string;
  courseId?: string;
  payload?: ISkill[];
}

export const initialState: ISkill[] = [];

export const skillReducer = (state: ISkill[] = initialState, action: ISkillsAction) => {
  switch (action.type) {
    case types.SAVE_SKILLS:
      return action.payload;
    default:
      return state;
  }
};

