import { ICourse } from '../../services/courses/reducers';
import { IQuestion, TQuestionType } from '../../services/questions/reducers';
import { NavigationScreenProp } from 'react-navigation';

export type TAnswer = string | string[];

export interface IState {
  answer: TAnswer;
  progress: number;
  answerCorrect: boolean;
}

export interface IAnswerProps {
  collectAnswer: (answer: TAnswer) => void;
}

export interface IProps {
  pendingQuestions: string[];
  navigation: NavigationScreenProp<any, any>;
  questions: IQuestion[];
  course: ICourse;
  calcProress: number;
  currentQuestion: IQuestion;
  nextQuestionOrFinish (questionId: string, status: TQuestionType): void;
  allCorrectAnswers (questionId: string): string[];
}
