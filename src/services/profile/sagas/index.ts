import { call, put, select } from 'redux-saga/effects';
import * as profile from 'services/profile';
import { isEmpty } from 'lodash';
import { IInitialState } from 'services/reducers';

export function* createProfile(action: profile.IProfileAction): IterableIterator<any> {
  const profileState = yield select((state: IInitialState) => state.profile);

  if (isEmpty(profileState)) {
    const profileData = yield call(profile.api.createProfile, action.payload);
    yield put(profile.actions.saveProfile(profileData));
  }
}

