import { ICourse } from 'services/courses';
import { ISkill } from 'services/skills';
import { IQuestion, TQuestionType } from 'services/questions';
import { NavigationScreenProp } from 'react-navigation';
import { IDictionary } from 'services/dictionaries';
import { IProfile } from 'services/profile';

export type TAnswer = string | string[];

export interface IState {
  answer: TAnswer;
  progress: number;
  answerCorrect: boolean;
  modalOn: boolean;
  movingNext: boolean;
  keyboardIsOn: boolean;
}

export interface IAnswerProps {
  collectAnswer: (answer: TAnswer) => void;
  userHasAnswered: boolean;
}

export interface IProps {
  profile: IProfile;
  course: ICourse;
  pending: string[];
  navigation: NavigationScreenProp<any, any>;
  questions: IQuestion[];
  dictionaries: IDictionary[];
  calcProress: number;
  currentQuestion: IQuestion;
  nextQuestionOrFinish (questionId: string, status: TQuestionType): void;
  allCorrectAnswers (questionId: string): string[];
  skillInProgress: ISkill;
  targetLanguage: TLangs;
  learnersLanguage: TLangs;
}
