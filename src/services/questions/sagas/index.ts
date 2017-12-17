import { call, put, select } from 'redux-saga/effects';
import { saveQuestions, updateQuestionStatus } from '../actions';
import { IQuestionsAction } from '../reducers';
import { getQuestions } from '../api';
import { NavigationActions } from 'react-navigation';
import { getPendingQuestions } from '../../selectors';

export function* fetchQuestions(action: IQuestionsAction): IterableIterator<any> {
  try {
    const response = yield call(getQuestions, action.lessonId);
    yield put(saveQuestions(response));
  } catch (error) {
    console.warn(error);
  }

  yield put(NavigationActions.navigate({ routeName: 'Questions' }));
}

export function* nextQuestionOrFinish(action: IQuestionsAction): IterableIterator<any> {
  yield put(updateQuestionStatus(action.questionId, action.status));
  const pendingQuestions: string[] = yield select(getPendingQuestions);
  let routeName = 'Questions';

  if (pendingQuestions.length === 0) {
    routeName = 'Completion';
  }

  yield put(NavigationActions.navigate({ routeName }));
}
