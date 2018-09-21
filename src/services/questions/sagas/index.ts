import { call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as questions from '../';
import * as dictionaries from 'services/dictionaries';
import { NavigationActions } from 'react-navigation';
import { getPending, getLessonInProgress, getActiveCourse } from '../../selectors';
import { setLoadingOn, setLoadingOff } from 'services/api/actions';
import * as exceptions from 'services/exceptions';
import { ISagasFunctions } from 'services/sagas';
import { downloadFile } from 'helpers';
import cloneDeep from 'clone-deep';
import { finishLesson } from 'services/progress/sagas';

export function* fetchQuestions(action: questions.IQuestionsAction): IterableIterator<any> {
  let fetchedQuestions;
  let reportError = false;
  let usingBackup = false;

  yield put(setLoadingOn());

  const activeCourse = yield select(getActiveCourse);
  yield put(dictionaries.actions.fetchDictionaries(activeCourse.id));

  try {
    fetchedQuestions = yield call(questions.api.getQuestions, action.lessonId);
  } catch (error) {
    if (error.response.status === null) {
      const lessonInProgress = yield select(getLessonInProgress);
      if (Array.isArray(lessonInProgress.questions) && lessonInProgress.questions.length) {
        usingBackup = true;
        fetchedQuestions = cloneDeep(lessonInProgress.questions);
      } else {
        reportError = true;
      }
    } else {
      reportError = true;
    }

    if (reportError) {
      yield put(exceptions.actions.add(error));
    }
  }

  if (!usingBackup) {
    yield call(cacheAudioSounds, fetchedQuestions);
  }

  yield call(saveQuestionsAndNavigate, fetchedQuestions, action.destination);

  yield put(setLoadingOff());
}

function* saveQuestionsAndNavigate(data: questions.IQuestion[], routeName: questions.TDestination = 'Questions') {
  yield put(questions.actions.saveQuestions(data));
  const action = NavigationActions.navigate({ routeName });
  if (routeName === 'Questions') {
    yield put(
      NavigationActions.reset({
        index: 0,
        actions: [action]
      })
    );
  } else {
    yield put(action);
  }
}

function* cacheAudioSounds(data: questions.IQuestion[]) {
  try {
    let question: questions.IQuestion;

    for (question of data) {
      if (question.soundFiles.length) {
        yield call(downloadFile, question.soundFiles[0]);
      }
    }
  } catch (error) {
    console.warn(error);
  }
}

export function* nextQuestionOrFinish(action: questions.IQuestionsAction): IterableIterator<any> {
  yield put(questions.actions.updateQuestionStatus(action.questionId, action.status));
  const pending: string[] = yield select(getPending);
  let routeName = 'Questions';

  if (pending.length === 0) {
    yield call(finishLesson);
    yield put(setLoadingOn());
    delay(300);
    yield put(setLoadingOff());
    routeName = 'Completion';
  }

  yield put(
    NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    })
  );
}

export const functions = (): ISagasFunctions[] => [
  { action: questions.actions.types.FETCH_QUESTIONS, func: fetchQuestions },
  { action: questions.actions.types.NEXT_QUESTION_OR_FINISH, func: nextQuestionOrFinish }
];
