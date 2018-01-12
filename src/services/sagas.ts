import { all, call, takeLatest, select } from 'redux-saga/effects';
import { TOKEN as defaultToken } from 'react-native-dotenv';
import { getTokenFromKeychain } from 'services/api/access';

import * as skills from './skills';
import * as progress from './progress';
import * as profile from './profile';
import * as courses from './courses';
import * as dictionaries from './dictionaries';
import * as questions from './questions';
import * as signon from './signon';

import { IInitialState } from 'services/reducers';
import { setUserToken } from 'services/api';

const withToken = (saga) => {
  return function* (action) {
    const currentProfile = yield select((state: IInitialState) => state.profile);

    if (!currentProfile.id) {
      console.log('No current member found');
      setUserToken(defaultToken);
    } else {
      const token = yield call(getTokenFromKeychain);
      console.log(`An existing member was found, and here's the token ${token}`);
      setUserToken(token);
    }

    yield call(saga, action);
  };
};

export interface ISagasFunctions {
  action: string;
  func: (action?: any) => void;
}

const sagasFunctions: ISagasFunctions[] = [
  ...courses.sagas.functions(),
  ...skills.sagas.functions(),
  ...profile.sagas.functions(),
  ...dictionaries.sagas.functions(),
  ...signon.sagas.functions(),
  ...questions.sagas.functions(),
  ...progress.sagas.functions(),
];

export default function* rootSagas(): IterableIterator<any> {
  yield all(sagasFunctions.map((sagasFunction: ISagasFunctions) => {
    return takeLatest(sagasFunction.action, withToken(sagasFunction.func));
  }));
}
