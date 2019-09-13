import { call, put, select } from 'redux-saga/effects';
import { getLeaderboard } from '../api';
import { saveLeaderboard } from '../actions';
import * as exceptions from 'services/exceptions';
import * as leaderboard from 'services/leaderboard';
import { getActiveCourse } from 'services/selectors';
export function* fetchLeaderboard() {
    try {
        const activeCourse = yield select(getActiveCourse);
        const response = yield call(getLeaderboard, activeCourse.id);
        yield put(saveLeaderboard(response));
    }
    catch (error) {
        yield put(exceptions.actions.add(error));
    }
}
export const functions = () => [
    { action: leaderboard.actions.types.FETCH_LEADERBOARD, func: fetchLeaderboard }
];
//# sourceMappingURL=index.js.map