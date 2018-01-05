import { call, put, select } from 'redux-saga/effects';
import { saveQuestions, updateQuestionStatus } from '../actions';
import { IQuestionsAction } from '../';
import { getQuestions } from '../api';
import { NavigationActions } from 'react-navigation';
import { getPendingQuestions } from '../../selectors';
import { setLoadingOn, setLoadingOff } from 'services/api/actions';
import * as exceptions from 'services/exceptions';

export function* fetchQuestions (action: IQuestionsAction): IterableIterator<any> {
  yield put(setLoadingOn());

  try {
    const response = yield call(getQuestions, action.lessonId);
    yield put(saveQuestions(response));
    yield put(NavigationActions.navigate({ routeName: 'Questions' }));
  } catch (error) {
    yield put(exceptions.actions.add(error));
  }

  yield put(setLoadingOff());
}

export function* nextQuestionOrFinish (action: IQuestionsAction): IterableIterator<any> {
  yield put(updateQuestionStatus(action.questionId, action.status));
  const pendingQuestions: string[] = yield select(getPendingQuestions);
  let routeName = 'Questions';

  if (pendingQuestions.length === 0) {
    routeName = 'Completion';
  }

  yield put(NavigationActions.navigate({ routeName }));
}
