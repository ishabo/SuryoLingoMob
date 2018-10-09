import { call, put, select } from 'redux-saga/effects';
import * as profile from 'services/profile';
import { isEmpty } from 'lodash';
import { IInitialState } from 'services/reducers';
import { ISagasFunctions } from 'services/sagas';
import { setAccessToken } from 'services/api/access';
import { isRegistered } from 'services/selectors';
import { Analytics, Crashlytics } from 'config/firebase';

export function* createProfileIfNeeded(action: profile.IProfileAction): IterableIterator<any> {
  const profileState = yield select((state: IInitialState) => state.profile);

  if (isEmpty(profileState)) {
    yield put(profile.actions.createProfile(action.payload));
  } else {
    yield put(profile.actions.fetchProfile());
  }
}

export function* createProfile(action: profile.IProfileAction): IterableIterator<any> {
  try {
    const profileData = yield call(profile.api.createProfile, action.payload);
    yield put(profile.actions.saveProfileAndAccessToken(profileData));
  } catch (error) {
    console.log(error);
  }
}

export function* updateProfile(action: profile.IProfileAction): IterableIterator<any> {
  const currentProfile = yield select((state: IInitialState) => state.profile);
  const profileData = yield call(profile.api.updateProfile(currentProfile.id), action.payload);
  yield put(profile.actions.saveProfileAndAccessToken(profileData));
}

export function* fetchProfile(): IterableIterator<any> {
  debugger;
  const userIsRegistered = yield select(isRegistered);
  if (userIsRegistered) {
    try {
      const profileData = yield call(profile.api.getUser);
      yield put(profile.actions.saveProfileAndAccessToken(profileData));
    } catch (error) {
      console.warn(error);
    }
  }
}

export function* saveProfileAndAccessToken(action: profile.IProfileAction): IterableIterator<any> {
  const accessToken = action.profileData.apiKey;
  delete action.profileData.apiKey;
  yield call(setAccessToken, accessToken);
  const { id, userXp } = action.profileData;

  Analytics.setUserId(id);
  if (userXp) {
    Analytics.setUserProperty('userXp', String(userXp));
  }

  Analytics.setUserId(action.profileData.id);
  Crashlytics.setUserIdentifier(action.profileData.id);
  Crashlytics.setStringValue('userName', action.profileData.name);
  Crashlytics.setStringValue('userEmail', action.profileData.email);

  yield put(profile.actions.saveProfile(action.profileData));
}

export const functions = (): ISagasFunctions[] => {
  const types = profile.actions.types;
  return [
    { action: types.CREATE_PROFILE_IF_NEEDED, func: createProfileIfNeeded },
    { action: types.CREATE_PROFILE, func: createProfile },
    { action: types.UPDATE_PROFILE, func: updateProfile },
    { action: types.FETCH_PROFILE, func: fetchProfile },
    {
      action: types.SAVE_PROFILE_AND_ACCESS_TOKEN,
      func: saveProfileAndAccessToken
    }
  ];
};
