import { call, put, select } from 'redux-saga/effects';
import * as signon from 'services/signon';
import * as profile from 'services/profile';
import { IInitialState } from 'services/reducers';
import { isEmpty } from 'lodash';
import { validateSigon } from '../validation';
import { setLoadingOn, setLoadingOff } from 'services/api/actions';
import { ISagasFunctions } from 'services/sagas';
import { NavigationActions } from 'react-navigation';
import { getActiveCourse, isRegistered } from 'services/selectors';

export function* submitSignon(): IterableIterator<any> {
  yield put(setLoadingOn());
  const fields = { ...yield select((state: IInitialState) => state.signon.item) };
  const errors = validateSigon(fields);

  if (isEmpty(errors)) {
    const hasRegistered = yield select(isRegistered);
    if (hasRegistered) {
      yield call(signon.api.signin, fields);
    } else {
      yield put(profile.actions.updateProfile(fields));
    }
    const activeCourse = yield select(getActiveCourse);
    const routeName = activeCourse ? 'Skills' : 'Courses';
    yield put(NavigationActions.navigate({ routeName }));

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


