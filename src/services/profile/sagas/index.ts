import { call, put, select } from 'redux-saga/effects'
import * as profile from '@sl/services/profile'
import { isEmpty } from 'lodash'
import { IInitialState } from '@sl/services/reducers'
import { ISagasFunctions } from '@sl/services/sagas'
import { setAccessToken } from '@sl/services/api/access'
import { isRegistered } from '@sl/services/selectors'
import analytics from '@react-native-firebase/analytics'
import crashlytics from '@react-native-firebase/crashlytics'

export function* createProfileIfNeeded(
  action: profile.IProfileAction,
): IterableIterator<any> {
  const profileState = yield select((state: IInitialState) => state.profile)

  if (isEmpty(profileState)) {
    yield put(profile.actions.createProfile(action.payload))
  } else {
    yield put(profile.actions.fetchProfile())
  }
}

export function* createProfile(
  action: profile.IProfileAction,
): IterableIterator<any> {
  try {
    const profileData = yield call(profile.api.createProfile, action.payload)
    yield put(profile.actions.saveProfileAndAccessToken(profileData))
  } catch (error) {
    console.log(error)
  }
}

export function* updateProfile(
  action: profile.IProfileAction,
): IterableIterator<any> {
  const currentProfile: profile.IProfile = yield select(
    (state: IInitialState) => state.profile,
  )
  const profileData = yield call(
    profile.api.updateProfile(currentProfile.id),
    action.payload,
  )
  yield put(profile.actions.saveProfileAndAccessToken(profileData))
}

export function* fetchProfile(): IterableIterator<any> {
  const userIsRegistered = yield select(isRegistered)
  if (userIsRegistered) {
    try {
      const profileData = yield call(profile.api.getUser)
      yield put(profile.actions.saveProfileAndAccessToken(profileData))
    } catch (error) {
      console.warn(JSON.stringify(error))
    }
  }
}

export function* saveProfileAndAccessToken(
  action: profile.IProfileAction,
): IterableIterator<any> {
  try {
    const accessToken = action.profileData.apiKey
    delete action.profileData.apiKey
    yield call(setAccessToken, accessToken)

    const { id, userXp } = action.profileData

    analytics().setUserId(id)
    if (userXp) {
      analytics().setUserProperty('userXp', String(userXp))
    }

    analytics().setUserId(action.profileData.id)
    crashlytics().setUserId(action.profileData.id)
    crashlytics().setAttribute('userName', action.profileData.name)
    crashlytics().setAttribute('userEmail', action.profileData.email)

    yield put(profile.actions.saveProfile(action.profileData))
  } catch (e) {
    console.warn(e.message)
  }
}

export const functions = (): ISagasFunctions[] => {
  const { types } = profile.actions
  return [
    { action: types.CREATE_PROFILE_IF_NEEDED, func: createProfileIfNeeded },
    { action: types.CREATE_PROFILE, func: createProfile },
    { action: types.UPDATE_PROFILE, func: updateProfile },
    { action: types.FETCH_PROFILE, func: fetchProfile },
    {
      action: types.SAVE_PROFILE_AND_ACCESS_TOKEN,
      func: saveProfileAndAccessToken,
    },
  ]
}
