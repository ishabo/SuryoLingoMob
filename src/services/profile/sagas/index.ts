import { call, put, select } from 'redux-saga/effects';
import * as profile from 'services/profile';
import { isEmpty } from 'lodash';
import { IInitialState } from 'services/reducers';
import { ISagasFunctions } from 'services/sagas';
import { setAccessToken } from 'services/api/access';
import { isRegistered } from 'services/selectors';
import { Analytics } from 'config/firebase';
const Fabric = require('react-native-fabric');
const { Crashlytics } = Fabric;

export function* createProfile(action: profile.IProfileAction): IterableIterator<any> {
  const profileState = yield select((state: IInitialState) => state.profile);

  if (isEmpty(profileState)) {
    try {
      const profileData = yield call(profile.api.createProfile, action.payload);
      yield put(profile.actions.saveProfileAndAccessToken(profileData));
    } catch (error) {
      console.log(error);
    }
  }
}

export function* updateProfile(action: profile.IProfileAction): IterableIterator<any> {
  const currentProfile = yield select((state: IInitialState) => state.profile);
  try {
    const profileData = yield call(profile.api.updateProfile(currentProfile.id), action.payload);

    yield put(profile.actions.saveProfileAndAccessToken(profileData));
  } catch (error) {
    console.log(error);
  }
}

export function* fetchProfile(): IterableIterator<any> {
  const userIsRegistered = yield select(isRegistered);
  if (userIsRegistered) {
    try {
      const response = yield call(profile.api.getUser);
      yield put(profile.actions.saveProfile(response));
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
  Crashlytics.setUserName(action.profileData.name);
  Crashlytics.setUserEmail(action.profileData.email);

  yield put(profile.actions.saveProfile(action.profileData));
}

export const functions = (): ISagasFunctions[] => {
  return [
    { action: profile.actions.types.CREATE_PROFILE, func: createProfile },
    { action: profile.actions.types.UPDATE_PROFILE, func: updateProfile },
    {
      action: profile.actions.types.SAVE_PROFILE_AND_ACCESS_TOKEN,
      func: saveProfileAndAccessToken
    }
  ];
};
