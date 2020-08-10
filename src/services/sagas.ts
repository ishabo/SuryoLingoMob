import { all, call, takeLatest, select, put } from 'redux-saga/effects'
import { TOKEN as defaultToken } from 'react-native-dotenv'
import { getAccessToken } from '@sl/services/api/access'

import { IInitialState } from '@sl/services/reducers'
import { setUserToken } from '@sl/services/api'
import * as skills from './skills/sagas'
import * as starter from './starter/sagas'
import * as progress from './progress/sagas'
import * as profile from './profile/sagas'
import * as courses from './courses/sagas'
import * as dictionaries from './dictionaries/sagas'
import * as questions from './questions/sagas'
import * as leaderboard from './leaderboard/sagas'
import * as signon from './signon/sagas'
import * as settings from './settings/sagas'
import * as assets from './assets/sagas'

import * as exceptions from './exceptions'

const preSagas = saga =>
  function* (action) {
    yield put(exceptions.actions.removeAll())

    yield call(saga, action)
  }

const withToken = saga =>
  function* (action) {
    const currentProfile = yield select((state: IInitialState) => state.profile)

    if (!currentProfile.id) {
      console.log(
        `No current member found. Pulling default token: ${defaultToken}`,
      )
      setUserToken(defaultToken)
    } else {
      const token = yield call(getAccessToken)
      console.log(`An existing member was found, and here's the token ${token}`)
      setUserToken(token)
    }

    yield call(saga, action)
  }

export interface IAction {
  type: string
}

export interface ISagasFunctions {
  action: string
  func: (action?: any) => void
}

const sagasFunctions: ISagasFunctions[] = [
  ...courses.functions(),
  ...skills.functions(),
  ...profile.functions(),
  ...dictionaries.functions(),
  ...signon.functions(),
  ...questions.functions(),
  ...progress.functions(),
  ...starter.functions(),
  ...assets.functions(),
  ...leaderboard.functions(),
  ...settings.functions(),
]

export default function* rootSagas(): IterableIterator<any> {
  yield all(
    sagasFunctions.map((sagasFunction: ISagasFunctions) =>
      takeLatest(sagasFunction.action, preSagas(withToken(sagasFunction.func))),
    ),
  )
}
