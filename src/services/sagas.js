import { all, call, takeLatest, select, put } from 'redux-saga/effects';
import { TOKEN as defaultToken } from 'react-native-dotenv';
import { getAccessToken } from 'services/api/access';
import * as skills from './skills';
import * as starter from './starter';
import * as progress from './progress';
import * as profile from './profile';
import * as courses from './courses';
import * as dictionaries from './dictionaries';
import * as questions from './questions';
import * as leaderboard from './leaderboard';
import * as signon from './signon';
import * as exceptions from './exceptions';
import * as settings from './settings';
import * as assets from './assets';
import { setUserToken } from 'services/api';
const preSagas = saga => {
    return function* (action) {
        yield put(exceptions.actions.removeAll());
        yield call(saga, action);
    };
};
const withToken = saga => {
    return function* (action) {
        const currentProfile = yield select((state) => state.profile);
        if (!currentProfile.id) {
            console.log(`No current member found. Pulling default token: ${defaultToken}`);
            setUserToken(defaultToken);
        }
        else {
            const token = yield call(getAccessToken);
            console.log(`An existing member was found, and here's the token ${token}`);
            setUserToken(token);
        }
        yield call(saga, action);
    };
};
const sagasFunctions = [
    ...courses.sagas.functions(),
    ...skills.sagas.functions(),
    ...profile.sagas.functions(),
    ...dictionaries.sagas.functions(),
    ...signon.sagas.functions(),
    ...questions.sagas.functions(),
    ...progress.sagas.functions(),
    ...starter.sagas.functions(),
    ...assets.sagas.functions(),
    ...leaderboard.sagas.functions(),
    ...settings.sagas.functions()
];
export default function* rootSagas() {
    yield all(sagasFunctions.map((sagasFunction) => {
        return takeLatest(sagasFunction.action, preSagas(withToken(sagasFunction.func)));
    }));
}
//# sourceMappingURL=sagas.js.map