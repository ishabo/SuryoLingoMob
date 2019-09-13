import { call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as questions from '../';
import * as dictionaries from 'services/dictionaries';
import { NavigationActions } from 'react-navigation';
import { getPending, getLessonInProgress } from '../../selectors';
import { setLoadingOn, setLoadingOff } from 'services/api/actions';
import { downloadFile } from 'helpers';
import cloneDeep from 'clone-deep';
import { finishLesson } from 'services/progress/sagas';
export function* fetchQuestions(action) {
    let fetchedQuestions;
    yield put(setLoadingOn());
    try {
        yield put(dictionaries.actions.fetchDictionaries());
        fetchedQuestions = yield call(questions.api.getQuestions, action.lessonId);
    }
    catch (error) {
        const lessonInProgress = yield select(getLessonInProgress);
        if (Array.isArray(lessonInProgress.questions) && lessonInProgress.questions.length) {
            fetchedQuestions = cloneDeep(lessonInProgress.questions);
        }
    }
    if (fetchedQuestions) {
        yield call(cacheAudioSounds, fetchedQuestions);
        yield call(saveQuestionsAndNavigate, fetchedQuestions, action.destination);
    }
    yield put(setLoadingOff());
}
function* saveQuestionsAndNavigate(data, routeName = 'Questions') {
    yield put(questions.actions.saveQuestions(data));
    const action = NavigationActions.navigate({ routeName });
    if (routeName === 'Questions') {
        yield put(NavigationActions.reset({
            index: 0,
            actions: [action]
        }));
    }
    else {
        yield put(action);
    }
}
function* cacheAudioSounds(data) {
    try {
        let question;
        for (question of data) {
            if (question.soundFiles.length) {
                yield call(downloadFile, question.soundFiles[0]);
            }
        }
    }
    catch (error) {
        console.warn(error);
    }
}
export function* nextQuestionOrFinish(action) {
    yield put(questions.actions.updateQuestionStatus(action.questionId, action.status));
    const pending = yield select(getPending);
    let routeName = 'Questions';
    if (pending.length === 0) {
        yield call(finishLesson);
        yield put(setLoadingOn());
        yield delay(300);
        yield put(setLoadingOff());
        routeName = 'Completion';
    }
    yield put(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName })]
    }));
}
export const functions = () => [
    { action: questions.actions.types.FETCH_QUESTIONS, func: fetchQuestions },
    { action: questions.actions.types.NEXT_QUESTION_OR_FINISH, func: nextQuestionOrFinish }
];
//# sourceMappingURL=index.js.map