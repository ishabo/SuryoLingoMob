import { call, put } from 'redux-saga/effects';
import { saveSkills } from '../actions';
import { ISkillsAction } from '../reducers';
import { getSkills } from '../api';
import { NavigationActions } from 'react-navigation';

export function* fetchSkills(action: ISkillsAction): IterableIterator<any> {
  try {
    const response = yield call(getSkills, action.courseId);
    yield put(saveSkills(response));
  } catch (error) {
    console.warn(error);
  }

  yield put(NavigationActions.navigate({ routeName: 'Skills' }));
}
