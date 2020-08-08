import { call, put, select } from 'redux-saga/effects'
import * as dictionaries from '@sl/services/dictionaries'
import { ISagasFunctions } from '@sl/services/sagas'
import { getActiveCourse } from '@sl/services/selectors'
import { ICourse } from '@sl/services/courses'
import { saveDictionaries } from '../actions'
import { getDictionaries } from '../api'

export function* fetchDictionaries(
  action: dictionaries.IDictionaryAction,
): IterableIterator<any> {
  let activeCourseId = action.courseId
  if (!activeCourseId) {
    const activeCourse: ICourse = yield select(getActiveCourse)
    activeCourseId = activeCourse.id
  }

  try {
    const response = yield call(getDictionaries, activeCourseId)
    yield put(saveDictionaries(response))
  } catch (e) {
    console.warn(e)
  }
}

export const functions = (): ISagasFunctions[] => [
  {
    action: dictionaries.actions.types.FETCH_DICTIONARIES,
    func: fetchDictionaries,
  },
]
