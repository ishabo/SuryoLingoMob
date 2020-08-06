import { call, put, select, delay } from 'redux-saga/effects';
import * as questions from '../';
import * as dictionaries from '@sl/services/dictionaries';
import { NavigationActions } from 'react-navigation';
import { getPending, getLessonInProgress } from '../../selectors';
import { setLoadingOn, setLoadingOff } from '@sl/services/api/actions';
import { ISagasFunctions } from '@sl/services/sagas';
import { downloadFile } from '@sl/helpers';
import cloneDeep from 'clone-deep';
import { finishLesson } from '@sl/services/progress/sagas';
import { ILesson } from '@sl/services/skills';

export function* fetchQuestions(
  action: questions.IQuestionsAction
): IterableIterator<any> {
  let fetchedQuestions;
  yield put(setLoadingOn());

  try {
    yield put(dictionaries.actions.fetchDictionaries());

    fetchedQuestions = yield call(questions.api.getQuestions, action.lessonId);
  } catch (error) {
    const lessonInProgress: ILesson = yield select(getLessonInProgress);

    if (
      Array.isArray(lessonInProgress.questions) &&
      lessonInProgress.questions.length
    ) {
      fetchedQuestions = cloneDeep(lessonInProgress.questions);
    }
  }

  if (fetchedQuestions) {
    yield call(cacheAudioSounds, fetchedQuestions);
    yield call(saveQuestionsAndNavigate, fetchedQuestions, action.destination);
  }

  yield put(setLoadingOff());
}

function* saveQuestionsAndNavigate(
  data: questions.IQuestion[],
  routeName: questions.TDestination = 'Questions'
) {
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

export function* nextQuestionOrFinish(
  action: questions.IQuestionsAction
): IterableIterator<any> {
  yield put(
    questions.actions.updateQuestionStatus(action.questionId, action.status)
  );
  const pending: string[] = yield select(getPending);
  let routeName = 'Questions';

  if (pending.length === 0) {
    yield call(finishLesson);
    yield put(setLoadingOn());
    yield delay(300);
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
  {
    action: questions.actions.types.NEXT_QUESTION_OR_FINISH,
    func: nextQuestionOrFinish
  }
];
