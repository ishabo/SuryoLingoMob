import { call, put } from 'redux-saga/effects'
import * as assets from '@sl/services/assets'
import { types } from '../actions'
import { ISagasFunctions } from '@sl/services/sagas'

export function* fetchSkillIcons(): IterableIterator<any> {
  const icons = yield call(assets.api.getSkillIcons)
  yield put(assets.actions.setSkillIcons(icons))
}

export function* fetchCourseImages(): IterableIterator<any> {
  const images = yield call(assets.api.getCourseImages)
  yield put(assets.actions.setCourseImages(images))
}

export const functions = (): ISagasFunctions[] => [
  { action: types.FETCH_SKILL_ICONS, func: fetchSkillIcons },
  { action: types.FETCH_COURSE_IMAGES, func: fetchCourseImages },
]
