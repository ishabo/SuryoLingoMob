import { call, put, select } from 'redux-saga/effects';
import * as skill from 'services/skills';
import { getActiveCourse } from 'services/selectors';
import { navToSkills } from 'helpers';
import { setLoadingOn, setLoadingOff } from 'services/api/actions';
import * as exceptions from 'services/exceptions';

export function* fetchSkills (): IterableIterator<any> {
  yield put(setLoadingOn());
  try {
    const course = yield select(getActiveCourse);
    const response = yield call(skill.api.getSkills, course.id);
    yield put(skill.actions.saveSkills(response));
    yield put(navToSkills(course));
  } catch (error) {
    yield put(exceptions.actions.add(error));
  }

  yield put(setLoadingOff());
}

