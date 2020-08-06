import { call, put, select, delay } from 'redux-saga/effects';
import * as signon from '@sl/services/signon';
import * as profile from '@sl/services/profile';
import * as progress from '@sl/services/progress';
import * as skills from '@sl/services/skills';
import * as courses from '@sl/services/courses';
import { IInitialState } from '@sl/services/reducers';
import { isEmpty } from 'lodash';
import { validateSignOn } from '../validation';
import {
  setLoadingOn,
  setLoadingOff,
  setFailureMessage,
  setSuccessMessage
} from '@sl/services/api/actions';
import { ISagasFunctions } from '@sl/services/sagas';
import { getActiveCourse } from '@sl/services/selectors';
import {
  logError,
  isApiResponse,
  resetToSkills,
  navToCourses
} from '@sl/helpers';
import RNRestart from 'react-native-restart';
import { deleteAccessToken } from '@sl/services/api/access';
import { LoginManager, AccessToken, LoginResult } from 'react-native-fbsdk';
import { NavigationActions } from 'react-navigation';
import analytics from '@react-native-firebase/analytics';

function* captureBadRequest(response, errors): IterableIterator<any> {
  logError(JSON.stringify(response));

  if (response.status === 400) {
    if (typeof response.data === 'object') {
      if (
        Array.isArray(response.data['email']) &&
        response.data['email'].indexOf('already exists') !== -1
      ) {
        errors['email'] = 'emailAlreadyExists';
      }
      if (
        Array.isArray(response.data['facebook_id']) &&
        response.data['facebook_id'].indexOf('already exists') !== -1
      ) {
        errors['facebook'] = 'facebookAlreadyConnected';
      }
    }
    yield put(signon.actions.setErrors(errors));
  }
}

export function* submitSignon(
  action: signon.ISignonFormAction
): IterableIterator<any> {
  yield put(setLoadingOn());

  const fields = yield select((state: IInitialState) => state.signon.item);

  if (action.signon === 'signin') {
    Reflect.deleteProperty(fields, 'name');
  }

  const errors: signon.ISignonFormErrors = validateSignOn(fields);
  if (isEmpty(errors)) {
    yield put(setLoadingOn());

    let profileData = yield select((state: IInitialState) => state.profile);

    try {
      if (action.signon === 'signin') {
        profileData = yield call(signon.api.signin, fields);
        yield put(profile.actions.saveProfileAndAccessToken(profileData));
      } else {
        profileData = yield call(profile.api.createProfile, fields);
        yield put(profile.actions.saveProfileAndAccessToken(profileData));
      }

      yield delay(2000);
      yield put(courses.actions.fetchCourses());
      yield put(signon.actions.resetSignOn());
      yield delay(500);
      const activeCourse = yield select(getActiveCourse);

      if (activeCourse) {
        yield put(skills.actions.fetchSkills());
        yield put(resetToSkills());
      } else {
        yield put(navToCourses());
      }
    } catch (error) {
      yield put(setLoadingOff());
      if (isApiResponse(error.response)) {
        yield call(captureBadRequest, error.response, errors);
      }
    }
  } else {
    yield put(signon.actions.setErrors(errors));
  }

  yield put(setLoadingOff());
}

export function* connectViaFacebook(
  actions: signon.ISignonFormAction
): IterableIterator<any> {
  debugger;
  analytics().logEvent('connect_via_facebook', {
    SignonType: actions.signon,
    Started: true
  });

  try {
    logError(JSON.stringify(actions));
    const result: LoginResult = yield call(LoginManager.logInWithPermissions, [
      'public_profile',
      'email'
    ]);
    if (result.isCancelled) {
      analytics().logEvent('connect_via_facebook', {
        SignonType: actions.signon,
        Cancelled: true
      });
    } else {
      const { accessToken }: AccessToken = yield call(
        AccessToken.getCurrentAccessToken
      );
      analytics().logEvent('connect_via_facebook', {
        SignonType: actions.signon,
        Successful: true
      });

      const facebookProfileData: { email: string; name: string } = yield call(
        signon.api.getFacebookProfile,
        accessToken
      );

      const payload = {
        password: accessToken,
        viaFacebook: true
      };

      const currentProfile: profile.IProfile = yield select(
        (state: IInitialState) => state.profile
      );

      if (actions.signon === 'connect') {
        const profileData = yield call(
          profile.api.updateProfile(currentProfile.id),
          payload
        );
        yield put(profile.actions.saveProfileAndAccessToken(profileData));
      } else {
        const { email, name } = facebookProfileData;
        yield put(signon.actions.captureSignon({ ...payload, name, email }));
        if (email) {
          yield put(signon.actions.submitSignon(actions.signon));
        }
      }
    }
  } catch (error) {
    yield put(setLoadingOff());
    const errors: signon.ISignonFormErrors = {};
    if (isApiResponse(error.response)) {
      yield call(captureBadRequest, error.response, errors);
    } else {
      logError(JSON.stringify(error));
      yield put(
        signon.actions.setErrors({ facebook: 'failedToLoginViaFacebook' })
      );
    }
  }
  yield put(setLoadingOff());
}

export function* recoverPassword(
  action: signon.ISignonFormAction
): IterableIterator<any> {
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
  yield put(NavigationActions.navigate({ routeName: 'DrawerClose' }));
  yield put(setLoadingOn());
  yield delay(500);
  yield put(profile.actions.resetProfile());
  yield put(progress.actions.resetProgress());
  yield put(skills.actions.resetSkills());
  yield put(courses.actions.resetCourses());
  yield call(deleteAccessToken);
  analytics().logEvent('signout_clicked', {});
  yield delay(500);
  yield put(setLoadingOff());

  yield call(RNRestart.Restart);
}

export const functions = (): ISagasFunctions[] => [
  { action: signon.actions.types.SUBMIT_SIGNON, func: submitSignon },
  { action: signon.actions.types.SIGNOUT, func: signout },
  { action: signon.actions.types.RECOVER_PASSWORD, func: recoverPassword },
  {
    action: signon.actions.types.CONNECT_VIA_FACEBOOK,
    func: connectViaFacebook
  }
];
