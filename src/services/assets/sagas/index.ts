import { call, put } from 'redux-saga/effects';
import * as assets from 'services/assets';
import { ISagasFunctions } from 'services/sagas';

export function* fetchSkillIcons (): IterableIterator<any> {
  const icons = yield call(assets.api.getSkillIcons);
  yield put(assets.actions.setSkillIcons(icons));
}

export function* fetchCourseImages (): IterableIterator<any> {
  const images = yield call(assets.api.getCourseImages);
  yield put(assets.actions.setCourseImages(images));
}

export const functions = (): ISagasFunctions[] => {
  return [
    { action: assets.actions.types.FETCH_SKILL_ICONS, func: fetchSkillIcons },
    { action: assets.actions.types.FETCH_COURSE_IMAGES, func: fetchCourseImages },
  ];
};
