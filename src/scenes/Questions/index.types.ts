import { ICourse } from 'services/courses';
import { ISkill } from 'services/skills';
import { IQuestion, TQuestionType } from 'services/questions';
import { NavigationScreenProp } from 'react-navigation';
import { IDictionary } from 'services/dictionaries';

export type TAnswer = string | string[];

export interface IState {
  answer: TAnswer;
  progress: number;
  answerCorrect: boolean;
  modalOn: boolean;
  layoutWidth: number;
}

export interface IAnswerProps {
  collectAnswer: (answer: TAnswer) => void;
  userHasAnswered: boolean;
}

export interface IProps {
  pendingQuestions: string[];
  navigation: NavigationScreenProp<any, any>;
  questions: IQuestion[];
  course: ICourse;
  dictionaries: IDictionary[];
  calcProress: number;
  currentQuestion: IQuestion;
  nextQuestionOrFinish (questionId: string, status: TQuestionType): void;
  allCorrectAnswers (questionId: string): string[];
  skillInProgress: ISkill;
}