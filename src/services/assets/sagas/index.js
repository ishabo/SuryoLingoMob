import { call, put } from 'redux-saga/effects';
import * as assets from 'services/assets';
export function* fetchSkillIcons() {
    const icons = yield call(assets.api.getSkillIcons);
    yield put(assets.actions.setSkillIcons(icons));
}
export function* fetchCourseImages() {
    const images = yield call(assets.api.getCourseImages);
    yield put(assets.actions.setCourseImages(images));
}
export const functions = () => {
    return [
        { action: assets.actions.types.FETCH_SKILL_ICONS, func: fetchSkillIcons },
        { action: assets.actions.types.FETCH_COURSE_IMAGES, func: fetchCourseImages },
    ];
};
//# sourceMappingURL=index.js.map