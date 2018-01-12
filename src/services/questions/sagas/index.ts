import { call, put, select } from 'redux-saga/effects';
import * as questions from '../';
import { NavigationActions } from 'react-navigation';
import { getPendingQuestions } from '../../selectors';
import { setLoadingOn, setLoadingOff } from 'services/api/actions';
import * as exceptions from 'services/exceptions';
import { ISagasFunctions } from 'services/sagas';

export function* fetchQuestions(action: questions.IQuestionsAction): IterableIterator<any> {
  yield put(setLoadingOn());

  try {
    const response = yield call(questions.api.getQuestions, action.lessonId);
    yield put(questions.actions.saveQuestions(response));
    yield put(NavigationActions.navigate({ routeName: 'Questions' }));
  } catch (error) {
    yield put(exceptions.actions.add(error));
  }

  yield put(setLoadingOff());
}

export function* nextQuestionOrFinish(action: questions.IQuestionsAction): IterableIterator<any> {
  yield put(questions.actions.updateQuestionStatus(action.questionId, action.status));
  const pendingQuestions: string[] = yield select(getPendingQuestions);
  let routeName = 'Questions';

  if (pendingQuestions.length === 0) {
    routeName = 'Completion';
  }

  yield put(NavigationActions.navigate({ routeName }));
}

export const functions = (): ISagasFunctions[] => {
  return [
    { action: questions.actions.types.FETCH_QUESTIONS, func: fetchQuestions },
    { action: questions.actions.types.NEXT_QUESTION_OR_FINISH, func: nextQuestionOrFinish },
  ];
};

