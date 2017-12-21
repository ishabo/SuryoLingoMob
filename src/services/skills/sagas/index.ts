import { call, put, select } from 'redux-saga/effects';
import { saveSkills } from '../actions';
import { ISkillsAction } from '../reducers';
import { getSkills } from '../api';
import { getActiveCourse } from '../../selectors';
import { navToSkills } from '../../../helpers';

export function* fetchSkills(action: ISkillsAction): IterableIterator<any> {
  try {
    const response = yield call(getSkills, action.courseId);
    yield put(saveSkills(response));
  } catch (error) {
    console.warn(error);
  }

  const course = yield select(getActiveCourse);
  yield put(navToSkills(course));
}

