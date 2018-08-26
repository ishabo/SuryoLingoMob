import { call, put } from 'redux-saga/effects';
import { getLeaderboard } from '../api';
import { saveLeaderboard } from '../actions';
import * as exceptions from 'services/exceptions';
import * as leaderboard from 'services/leaderboard';
import { ISagasFunctions } from 'services/sagas';

export function* fetchLeaderboard(): IterableIterator<any> {
  try {
    const response = yield call(getLeaderboard);
    yield put(saveLeaderboard(response));
  } catch (error) {
    yield put(exceptions.actions.add(error));
  }
}

export const functions = (): ISagasFunctions[] => [
  { action: leaderboard.actions.types.FETCH_LEADERBOARD, func: fetchLeaderboard }
];
