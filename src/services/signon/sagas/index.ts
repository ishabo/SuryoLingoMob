import { call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as signon from 'services/signon';
import * as profile from 'services/profile';
import * as progress from 'services/progress';
import * as skills from 'services/skills';
import * as courses from 'services/courses';
import { IInitialState } from 'services/reducers';
import { isEmpty } from 'lodash';
import { validateSigon } from '../validation';
import { setLoadingOn, setLoadingOff, setFailureMessage, setSuccessMessage } from 'services/api/actions';
import { ISagasFunctions } from 'services/sagas';
import { getActiveCourse } from 'services/selectors';
import { isApiResponse, resetToCourses } from 'helpers';
import RNRestart from 'react-native-restart';
import { deleteAccessToken } from 'services/api/access';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { NavigationActions } from 'react-navigation';
import { Analytics } from 'config/firebase';

export function* submitSignon(action: signon.ISignonFormAction): IterableIterator<any> {
  const fields = { ...(yield select((state: IInitialState) => state.signon.item)) };

  if (action.signon === 'signin') {
    delete fields['name'];
  }

  const errors: signon.ISignonFormErrors = validateSigon(fields);
  if (isEmpty(errors)) {
    yield put(setLoadingOn());

    let profileData = yield select((state: IInitialState) => state.profile);

    try {
      if (action.signon === 'signin') {
        profileData = yield call(signon.api.signin, fields);
        yield put(profile.actions.saveProfileAndAccessToken(profileData));
      }
      profileData = yield select((state: IInitialState) => state.profile);

      profileData = yield call(profile.api.updateProfile(profileData.id), fields);

      yield put(profile.actions.saveProfileAndAccessToken(profileData));
      yield put(signon.actions.reseTSignonType());

      const activeCourse = yield select(getActiveCourse);
      yield delay(100);

      if (activeCourse) {
        yield put(skills.actions.fetchSkills());
      } else {
        yield put(resetToCourses());
      }
    } catch (error) {
      console.warn(error.response);
      if (isApiResponse(error.response)) {
        if (error.response.status === 400) {
          if (error.response.data.match(/Email already exists/)) {
            errors['email'] = 'emailAlreadyExists';
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

export function* connectViaFacebook(actions: signon.ISignonFormAction): IterableIterator<any> {
  Analytics.logEvent('connect_via_facebook', { SignonType: actions.signon, Started: true });

  const result = yield call(LoginManager.logInWithReadPermissions, ['public_profile', 'email']);
  if (result.isCancelled) {
    Analytics.logEvent('connect_via_facebook', { SignonType: actions.signon, Cancelled: true });
  } else {
    const { accessToken } = yield call(AccessToken.getCurrentAccessToken);
    Analytics.logEvent('connect_via_facebook', { SignonType: actions.signon, Successful: true });

    const profileData = yield call(signon.api.getFacebookProfile, accessToken);
    const payload = {
      password: accessToken,
      viaFacebook: true
    };

    if (actions.signon === 'connect') {
      yield put(profile.actions.updateProfile(payload));
    } else {
      yield put(signon.actions.captureSignon({ ...payload, name: profileData.name, email: profileData.email }));

      yield put(signon.actions.submitSignon(actions.signon));
    }
  }
}

export function* recoverPassword(action: signon.ISignonFormAction): IterableIterator<any> {
  yield put(setLoadingOn());
  try {
    yield call(signon.api.recoverPassword, action.email);
    yield put(setSuccessMessage('passwordRecoverySuccess', true));
  } catch (error) {
    if (isApiResponse(error)) {
      if (error.response.status === 422) {
        yield put(setFailureMessage('passwordRecoveryFailure', true));
      }
    }
  }

  yield put(setLoadingOff());
}

export function* signout(): IterableIterator<any> {
  Analytics.logEvent('signout_clicked', {});
  yield put(setLoadingOn());
  yield put(NavigationActions.navigate({ routeName: 'DrawerClose' }));
  yield delay(500);
  yield put(profile.actions.resetProfile());
  yield put(progress.actions.resetProgress());
  yield put(skills.actions.resetSkills());
  yield put(courses.actions.resetCourses());
  yield call(deleteAccessToken);
  yield delay(500);
  yield put(setLoadingOff());

  yield call(RNRestart.Restart);
}

export const functions = (): ISagasFunctions[] => [
  { action: signon.actions.types.SUBMIT_SIGNON, func: submitSignon },
  { action: signon.actions.types.SIGNOUT, func: signout },
  { action: signon.actions.types.RECOVER_PASSWORD, func: recoverPassword },
  { action: signon.actions.types.CONNECT_VIA_FACEBOOK, func: connectViaFacebook }
];
