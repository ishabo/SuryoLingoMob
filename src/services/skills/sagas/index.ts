import { call, put } from 'redux-saga/effects';
import { saveSkills } from '../actions';
import { ISkillsAction } from '../reducers';
import { NavigationActions } from 'react-navigation';
import { getSkills } from '../api';

export default function* fetchSkills(action: ISkillsAction): IterableIterator<any> {
  try {
    const response = yield call(getSkills, action.courseId);
    yield put(saveSkills(response));
    yield put(NavigationActions.navigate({ routeName: 'Skills' }));
  } catch (e) {

  }

}
