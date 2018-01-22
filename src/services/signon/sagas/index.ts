import { call, put, select } from 'redux-saga/effects';
import * as signon from 'services/signon';
import * as profile from 'services/profile';
import { IInitialState } from 'services/reducers';
import { isEmpty } from 'lodash';
import { validateSigon } from '../validation';
import { setLoadingOn, setLoadingOff } from 'services/api/actions';
import { ISagasFunctions } from 'services/sagas';
import { NavigationActions } from 'react-navigation';
import { getActiveCourse } from 'services/selectors';
import { navToSkills, isApiResponse } from 'helpers';

export function* submitSignon(action: signon.ISignonFormAction): IterableIterator<any> {
  yield put(setLoadingOn());
  const fields = { ...yield select((state: IInitialState) => state.signon.item) };
  if (action.signon === 'signin') {
    delete fields['name'];
  }

  const errors: signon.ISignonFormErrors = validateSigon(fields);

  if (isEmpty(errors)) {

    const currentProfile = yield select((state: IInitialState) => state.profile);

    try {
      let profileData;

      if (action.signon === 'signin') {
        profileData = yield call(signon.api.signin, fields);
      } else {
        profileData = yield call(profile.api.updateProfile(currentProfile.id), fields);
      }

      yield put(profile.actions.saveProfileAndAccessToken(profileData));
      yield put(signon.actions.resetSignon());

      const activeCourse = yield select(getActiveCourse);

      if (activeCourse) {
        yield put(navToSkills(activeCourse));
      } else {
        yield put(NavigationActions.navigate({ routeName: 'Courses' }));
      }

    } catch (error) {
      if (isApiResponse) {
        if (error.response.status === 400) {
          if (error.response.data.match(/Email already exists/)) {
            errors['email'] = 'email_already_exists';
          }
          yield put(signon.actions.setErrors(errors));
        }
      }
    }

  } else {
    yield put(signon.actions.setErrors(errors));
  }

  yield put(setLoadingOff());
}

export const functions = (): ISagasFunctions[] => {
  return [
    { action: signon.actions.types.SUBMIT_SIGNON, func: submitSignon },
  ];
};


