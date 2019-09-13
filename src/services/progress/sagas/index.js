import { delay } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import * as progress from 'services/progress';
import * as questions from 'services/questions';
import { getLessonInProgress, getSkillsByUnit, getSkillInProgress, getActiveCourse, getLessonsToSync, numOfTimesLessonInProgressPassed, calcTotaluserXp } from 'services/selectors';
import config from 'config/';
import { setLessonInProgress } from '../actions';
import * as skills from 'services/skills';
import { saveProfile } from 'services/profile/actions';
import { setLoadingOn } from 'services/api/actions';
export function* enterLesson(action) {
    yield put(setLoadingOn());
    yield put(setLessonInProgress(action.lessonId));
    yield put(questions.actions.fetchQuestionsForLesson(action.lessonId, 'Questions'));
}
export function* overviewLesson(action) {
    yield put(setLessonInProgress(action.lessonId));
    yield put(questions.actions.fetchQuestionsForLesson(action.lessonId, 'LessonOverview'));
}
const calcLessonXp = (lessonXp, timesLessonPassed) => {
    let newLessonXp = lessonXp;
    switch (timesLessonPassed) {
        case 0:
            newLessonXp = lessonXp;
            break;
        case 1:
            newLessonXp = lessonXp / 2;
            break;
        case 2:
            newLessonXp = lessonXp / 4;
            break;
        default:
            newLessonXp = lessonXp / 10;
            break;
    }
    return Math.ceil(newLessonXp);
};
export function* finishLesson() {
    let { lessonXP } = config;
    const numOfTimesLessonPassed = yield select(numOfTimesLessonInProgressPassed);
    lessonXP = calcLessonXp(lessonXP, numOfTimesLessonPassed);
    const { id: lessonId } = yield select(getLessonInProgress);
    const course = yield select(getActiveCourse);
    const skillInProgress = yield select(getSkillInProgress);
    const timestamp = new Date();
    yield put(skills.actions.markLessonFinished(lessonId, lessonXP, timestamp));
    yield put(progress.actions.setLessonToSync({
        lessonId,
        lessonXP,
        skillId: skillInProgress.id,
        courseId: course.id,
        createdAt: timestamp
    }));
    yield delay(200);
    const skillsOfUnit = yield select(getSkillsByUnit(skillInProgress.unit));
    const userXp = yield select(calcTotaluserXp);
    const profile = yield select((state) => state.profile);
    yield put(saveProfile(Object.assign({}, profile, { userXp })));
    if (isUnitFinished(skillsOfUnit)) {
        const nextUnit = skillInProgress.unit + 1;
        yield put(skills.actions.activateUnit(nextUnit));
    }
    yield delay(200);
    yield put(progress.actions.syncFinishedLessons());
}
export function* syncFinishedLessons() {
    const lessonsToSync = yield select(getLessonsToSync);
    if (lessonsToSync.length > 0) {
        try {
            yield call(progress.api.syncFinishedLessons, lessonsToSync);
            yield put(progress.actions.resetLessonsToSync());
        }
        catch (error) {
            console.warn(error);
        }
    }
}
const isUnitFinished = (skills) => {
    let skill;
    for (skill of skills) {
        if (skill.progress !== 1) {
            // progress 1 means all lessons are passed.
            return false;
        }
    }
    return true;
};
export const functions = () => {
    return [
        { action: progress.actions.types.ENTER_LESSON, func: enterLesson },
        { action: progress.actions.types.FINISH_LESSON, func: finishLesson },
        { action: progress.actions.types.SYNC_FINISHED_LESSONS, func: syncFinishedLessons },
        { action: progress.actions.types.OVERVIEW_LESSON, func: overviewLesson }
    ];
};
//# sourceMappingURL=index.js.map