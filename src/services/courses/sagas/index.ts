import { call, put, delay } from 'redux-saga/effects'
import * as courses from '@sl/services/courses'
import * as skill from '@sl/services/skills'
import * as assets from '@sl/services/assets'
import * as dictionaries from '@sl/services/dictionaries'
import { ISagasFunctions } from '@sl/services/sagas'
import { resetToSkills } from '@sl/helpers'
import { types } from '../actions'

export function* fetchCourses(): IterableIterator<any> {
  try {
    const response = yield call(courses.api.getCourses)
    yield put(courses.actions.saveCourses(response))
    yield put(assets.actions.fetchCourseImages())
  } catch (e) {
    const err = e
    console.warn('Error', err)
  }
}

export function* switchCourse(
  action: courses.ICourseAction,
): IterableIterator<any> {
  yield delay(1000)
  yield put(courses.actions.setActiveCourse(action.courseId))
  yield put(dictionaries.actions.fetchDictionaries(action.courseId))
  yield put(skill.actions.fetchSkills())
  yield put(resetToSkills())
}

export const functions = (): ISagasFunctions[] => [
  { action: types.FETCH_COURSES, func: fetchCourses },
  { action: types.SWITCH_COURSE, func: switchCourse },
]
