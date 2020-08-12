import { call, put, select } from 'redux-saga/effects'
import { getLeaderboard } from '@sl/services/leaderboard/api'
import { types, saveLeaderboard } from '@sl/services/leaderboard/actions'
import * as exceptions from '@sl/services/exceptions'
import { ISagasFunctions } from '@sl/services/sagas'
import { getActiveCourse } from '@sl/services/selectors'
import { ICourse } from '@sl/services/courses'

export function* fetchLeaderboard(): IterableIterator<any> {
  try {
    const activeCourse: ICourse = yield select(getActiveCourse)
    const response = yield call(getLeaderboard, activeCourse.id)
    yield put(saveLeaderboard(response))
  } catch (error) {
    yield put(exceptions.actions.add(error))
  }
}

export const functions = (): ISagasFunctions[] => [
  {
    action: types.FETCH_LEADERBOARD,
    func: fetchLeaderboard,
  },
]
