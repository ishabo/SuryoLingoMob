import { call, put, select } from 'redux-saga/effects';
import * as profile from 'services/profile';
import { isEmpty } from 'lodash';
import { IInitialState } from 'services/reducers';
import SInfo from 'react-native-sensitive-info';
import Config from 'config';

export function* createProfile (action: profile.IProfileAction): IterableIterator<any> {
  const profileState = yield select((state: IInitialState) => state.profile);

  if (isEmpty(profileState)) {
    const profileData = yield call(profile.api.createProfile, action.payload);

    yield put(profile.actions.saveProfileAndAccessToken(profileData));
  }
}

export function* updateProfile (action: profile.IProfileAction): IterableIterator<any> {
  const profileData = yield call(profile.api.updateProfile, action.payload);
  yield put(profile.actions.saveProfileAndAccessToken(profileData));
}

export function* saveProfileAndAccessToken (action: profile.IProfileAction) {
  const accessToken = action.payload.apiKey;
  delete action.payload.apiKey;
  yield call(SInfo.setItem, 'accessToken', accessToken, Config.sInfoOptions);
  yield put(profile.actions.saveProfile(action.payload));
}
