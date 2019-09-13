import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as courses from 'services/courses';
import * as skill from 'services/skills';
import * as assets from 'services/assets';
import * as dictionaries from 'services/dictionaries';
import { resetToSkills } from 'helpers';
export function* fetchCourses() {
    try {
        const response = yield call(courses.api.getCourses);
        yield put(courses.actions.saveCourses(response));
        yield put(assets.actions.fetchCourseImages());
    }
    catch (e) {
        console.warn(e);
    }
}
export function* switchCourse(action) {
    yield delay(1000);
    yield put(courses.actions.setActiveCourse(action.courseId));
    yield put(dictionaries.actions.fetchDictionaries(action.courseId));
    yield put(skill.actions.fetchSkills());
    yield put(resetToSkills());
}
export const functions = () => {
    return [
        { action: courses.actions.types.FETCH_COURSES, func: fetchCourses },
        { action: courses.actions.types.SWITCH_COURSE, func: switchCourse }
    ];
};
//# sourceMappingURL=index.js.map